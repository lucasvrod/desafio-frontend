import { ProductCard } from './ProductCard';
import { Product } from '../../types/product';

interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
}

export const ProductList = ({ products, isLoading = false }: ProductListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="h-80 bg-gray-100 animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">Nenhum produto encontrado</h3>
        <p className="text-gray-500">Tente ajustar os filtros ou adicione um novo produto.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};