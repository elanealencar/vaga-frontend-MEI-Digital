export type Service = {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
};

export type Contratado = {
  id: number;
  nomeCompleto: string;
  email: string;
  telefone: string;
  servicoId: number;
  servicoNome: string; 
};
