import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../../types/product';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const isHighRated = product.rating.rate > 4.5;
  
  return (
    <Card className={`h-full flex flex-col transition-all hover:shadow-lg ${isHighRated ? 'ring-2 ring-amber-500' : ''}`}>
      <CardHeader className="p-4">
        <div className="relative w-full h-48">
          <Image 
            src={product.image} 
            alt={product.title}
            layout="fill"
            className="object-contain"
          />
        </div>
        <CardTitle className="mt-4 text-lg truncate" title={product.title}>
          {product.title.length > 30 
            ? `${product.title.substring(0, 27)}...` 
            : product.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <div className="flex items-center justify-between mb-2">
          <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
          <Badge variant={isHighRated ? "default" : "outline"}>
            ⭐ {product.rating.rate} ({product.rating.count})
          </Badge>
        </div>
        <Badge variant="secondary" className="mb-2">{product.category}</Badge>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between">
        <Link 
          href={`/products/${product.id}`}
          className="text-blue-600 hover:underline text-sm"
        >
          Ver detalhes
        </Link>
        <Link 
          href={`/products/edit/${product.id}`}
          className="text-amber-600 hover:underline text-sm"
        >
          Editar
        </Link>
      </CardFooter>
    </Card>
  );
};