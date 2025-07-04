import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Service } from '../types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes';

type Props = {
  service: Service;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function ServiceCard({ service }: Props) {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{service.nome}</Text>
      <Text style={styles.price}>Preço: R$ {service.preco}</Text>
      <Text style={styles.price}>Descrição: {service.descricao}</Text>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && { backgroundColor: '#facc15' }, // hover effect
        ]}
        onPress={() => navigation.navigate('Form', { service })}
      >
        <Text style={styles.buttonText}>Contratar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0e7490', // cyan-700
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    color: '#374151', // gray-700
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#fcd34d', // yellow-400
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#1f2937', // gray-800
    fontWeight: '600',
    fontSize: 15,
  },
});
