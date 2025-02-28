'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../../types/product';
import { fetchProductById, deleteProduct } from '../../services/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DeleteConfirmation } from '../../components/product/DeleteConfirmation';
import { ArrowLeft, Edit, Trash } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const productData = await fetchProductById(parseInt(params.id));
        setProduct(productData);
      } catch (err) {
        setError('Não foi possível carregar o produto. Tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [params.id]);
  
  const handleDelete = async () => {
    if (!product) return;
    
    try {
      await deleteProduct(product.id);
      router.push('/');
    } catch (err) {
      setError('Erro ao excluir o produto. Tente novamente mais tarde.');
      console.error(err);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded"></div>
            <div className="w-full md:w-1/2">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error || 'Produto não encontrado'}
        </div>
        <Button asChild variant="outline">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Voltar para a lista
          </Link>
        </Button>
      </div>
    );
  }
  
  const isHighRated = product.rating.rate > 4.5;
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <Button asChild variant="outline">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Voltar para a lista
          </Link>
        </Button>
        
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/products/edit/${product.id}`} className="flex items-center gap-2">
              <Edit size={16} />
              Editar
            </Link>
          </Button>
          
          <Button 
            variant="destructive" 
            onClick={() => setShowDeleteDialog(true)}
            className="flex items-center gap-2"
          >
            <Trash size={16} />
            Excluir
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 relative h-96 bg-white rounded-lg overflow-hidden border">
          <Image 
            src={product.image} 
            alt={product.title}
            layout="fill"
            className="object-contain p-4"
          />
        </div>
        
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
            
            <div className="flex gap-2">
              <Badge variant={isHighRated ? "default" : "outline"} className="flex items-center gap-1">
                ⭐ {product.rating.rate}
              </Badge>
              <Badge variant="secondary">
                {product.rating.count} avaliações
              </Badge>
            </div>
          </div>
          
          <Badge className="mb-6">{product.category}</Badge>
          
          <h2 className="text-xl font-semibold mb-2">Descrição</h2>
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>
      
      <DeleteConfirmation
        product={product}
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}