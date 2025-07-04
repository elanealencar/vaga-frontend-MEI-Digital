import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Service, Contratado } from '@/types/Service';
import { Header } from '@/components/Header';
import { ServiceCard } from '@/components/ServiceCard';

export default function Home() {
  const [servicos, setServicos] = useState<Service[]>([]);
  const [contratados, setContratados] = useState<Contratado[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicosRes, contratadosRes] = await Promise.all([
          api.get<Service[]>('/servicos'),
          api.get<Contratado[]>('/contratados'),
        ]);
        setServicos(servicosRes.data);
        setContratados(contratadosRes.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col bg-gray-50">      
        <main className="flex-1 p-6 space-y-8">
          {isLoading ? (
            <p className="text-gray-500 text-center">Carregando serviços...</p>
          ) : (
          <>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">Serviços Cadastrados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {servicos.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-800">Serviços Contratados</h2>
            <ul className="space-y-4">
              {contratados.map(c => (
                <li 
                  key={c.id}
                  className="bg-white p-4 rounded-lg shadow border border-gray-200"
                >
                  <p className="text-gray-800">
                    <span className="font-semibold">{c.nomeCompleto}</span> contratou o serviço{' '}
                    <span className="text-blue-700 font-semibold">{c.servicoNome}</span>
                  </p>
                  <p className="text-gray-500 text-sm mt-1">{c.email} • {c.telefone}</p>

                </li>
              ))}
            </ul>
          </section>
          </>
          )}
          
        </main>
        <footer className="bg-gray-700 text-gray-200 p-4 text-center">
          © 2025. Desenvolvido por ElaneAlencar.
        </footer>
      </div>
    </>
  );
}
