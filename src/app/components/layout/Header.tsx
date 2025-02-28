import Link from 'next/link';

export const Header = () => {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Desafio Frontend
        </Link>
        
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Produtos
              </Link>
            </li>
            <li>
              <Link href="/products/create" className="hover:text-blue-600 transition-colors">
                Adicionar Produto
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};