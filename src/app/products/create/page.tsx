'use client';

import { createProduct } from '../../services/api';
import { ProductForm } from '../../components/product/ProductForm';
import { ProductInput } from '../../types/product';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CreateProductPage() {
  const handleCreateProduct = async (data: ProductInput) => {
    await createProduct(data);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button asChild variant="outline" className="mb-6">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Voltar para a lista
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold mb-6">Criar Novo Produto</h1>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <ProductForm onSubmit={handleCreateProduct} />
      </div>
    </div>
  );
}