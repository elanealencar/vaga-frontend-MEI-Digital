import { Service } from '@/types/Service';

type Props = {
  service: Service;
};

export const ServiceCard = ({ service }: Props) => {
  return (
    <div className="bg-white border border-gray-200 shadow-md p-6 rounded-xl">
      <h3 className="text-lg font-semibold">{service.nome}</h3>
      <p className="text-md text-gray-800 mt-2">Preço: R$ {service.preco}</p>
      {service.descricao && (
        <p className="text-gray-600 mt-4 text-sm">
          {service.descricao}
        </p>
      )}

    </div>
  );
};
