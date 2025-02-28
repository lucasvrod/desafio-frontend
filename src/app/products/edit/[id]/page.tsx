'use client';

import { useState, useEffect } from 'react';
import { fetchProductById, updateProduct } from '../../../services/api';
import { ProductForm } from '../../../components/product/ProductForm';
import { Product, ProductInput } from '../../../types/product';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
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
  
  const handleUpdateProduct = async (data: ProductInput) => {
    if (!product) return;
    await updateProduct(product.id, data);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="bg-white p-6 rounded-lg">
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
            <div className="h-24 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
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
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button asChild variant="outline" className="mb-6">
          <Link href={`/products/${product.id}`} className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Voltar para o produto
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold mb-6">Editar Produto</h1>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <ProductForm 
          product={product} 
          onSubmit={handleUpdateProduct} 
          isEditing={true} 
        />
      </div>
    </div>
  );
}