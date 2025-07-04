

export const Header = () => {
  return (
   <header className="bg-white text-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo MEI Digital" className="h-8 w-auto" />
      </div>
      <nav className="space-x-4">
        <a href="/" className="text-cyan-400 bg-white font-bold text-lg px-3 py-2 rounded hover:bg-gray-300 border">Página inicial</a>
        <a href="/cadastrar" className="font-bold text-black bg-yellow-400 hover:bg-gray-300 text-lg px-3 py-2 rounded">
          Cadastrar Serviço
        </a>
      </nav>
    </header>
  );
};
