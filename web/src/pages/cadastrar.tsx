import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { api } from '@/services/api';
import { Header } from '@/components/Header';
import { useRouter } from 'next/router';
import { useState } from 'react';


type FormValues = {
  nome: string;
  preco: number;
  descricao?: string;
};

const schema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório!'),
  preco: yup.number().typeError('O preço deve ser um número').required('O preço é obrigatório!'),
  descricao: yup.string().optional(),
});

export default function Cadastrar() {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await api.post('/servicos', data);
      setSuccessMessage('✅ Serviço cadastrado com sucesso!');
      reset();
      setTimeout(() => {
        setSuccessMessage('');
        router.push('/');
      }, 2000);
    } catch (error) {
      console.error('Erro ao cadastrar serviço:', error);
    }
  };

  return (
    <>
      <Header />
      <main className="p-4 max-w-xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Cadastrar Novo Serviço</h2>
    
        <form
          onSubmit={handleSubmit(onSubmit)} 
          className="bg-white p-8 rounded-xl shadow-md border border-gray-200 space-y-6"
        >
          <div>
            <label className="block text-gray-700 mb-1">
              Nome do serviço <span className="text-sm text-red-500 mt-1">*</span>
            </label>
            <input 
              {...register('nome')}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
            <p className="text-sm text-red-500 mt-1">{errors.nome?.message}</p>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">
              Preço <span className="text-red-500">*</span>
            </label>
            <input 
              {...register('preco')}
              type="number"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
            <p className="text-sm text-red-500 mt-1">{errors.preco?.message}</p>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Descrição</label>
            <textarea
              {...register('descricao')} 
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              placeholder="descrição opcional"

            />
          </div>

          <button 
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-md transition duration-200"
          >
            Cadastrar serviço
          </button>
          
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 p-3 rounded mb-4">
              {successMessage}
            </div>
          )}
        </form>
      </main>
    </>
  );
}
