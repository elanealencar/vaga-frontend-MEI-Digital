import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { api } from '../services/api';
import { Service } from '../types';
import { ServiceCard } from '../components/ServiceCard';

export default function HomeScreen() {
  const [servicos, setServicos] = useState<Service[]>([]);

  useEffect(() => {
    api.get('/servicos').then(response => {
      setServicos(response.data);
    });
  }, []);

  return (
    <FlatList
      data={servicos}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => <ServiceCard service={item} />}
    />
  );
}
