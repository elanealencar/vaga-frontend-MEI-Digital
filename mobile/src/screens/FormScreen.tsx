import { View, Text, TextInput, Alert, Pressable, StyleSheet, KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../routes';
import { useState } from 'react';
import { api } from '../services/api';


type FormRouteProp = RouteProp<RootStackParamList, 'Form'>;

const schema = yup.object().shape({
  nomeCompleto: yup.string().required('Nome obrigatório'),
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  telefone: yup.string().required('Telefone obrigatório'),
});

export default function FormScreen() {
  const route = useRoute<FormRouteProp>();
  const navigation = useNavigation();
  const { service } = route.params;
  const [isSubmitting, setIsSubmitting] = useState(false);


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

const onSubmit = async (data: any) => {
  try {
    setIsSubmitting(true);
    console.log('Dados do formulário:', data);
    console.log('Serviço contratado:', service);

    await api.post('/contratados', {
      ...data,
      servicoId: service.id,
      servicoNome: service.nome,
    });

    Alert.alert('Sucesso', `Serviço "${service.nome}" contratado com sucesso!`);

    setTimeout(() => {
      navigation.goBack();
    }, 2000);
  } catch (error) {
    console.error('Erro ao contratar serviço:', error);
    Alert.alert('Erro', 'Não foi possível contratar o serviço.');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Contratar Serviço</Text>
        <Text style={styles.serviceName}>{service.nome}</Text>

        <Controller
          control={control}
          name="nomeCompleto"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              placeholderTextColor="#9CA3AF"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.nomeCompleto && <Text style={styles.error}>{errors.nomeCompleto.message}</Text>}

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#9CA3AF"
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
            />
          )}
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

        <Controller
          control={control}
          name="telefone"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              placeholderTextColor="#9CA3AF"
              value={value}
              keyboardType="phone-pad"
              onChangeText={onChange}
            />
          )}
        />
        {errors.telefone && <Text style={styles.error}>{errors.telefone.message}</Text>}

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { backgroundColor: '#facc15' },
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? 'Enviando...' : 'Confirmar Contratação'}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0e7490', // cyan-700
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 18,
    color: '#374151', // gray-700
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB', // gray-300
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    color: '#111827', // gray-900
  },
  error: {
    color: '#dc2626', // red-600
    fontSize: 13,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#fcd34d', // yellow-400
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#1f2937', // gray-800
    fontWeight: '600',
    fontSize: 16,
  },
});