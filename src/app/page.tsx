'use client';

import Link from 'next/link';
import { useProducts } from './hooks/useProducts';
import { ProductList } from './components/product/ProductList';
import { ProductFilter } from './components/product/ProductFilter';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

export default function Home() {
  const {
    products,
    categories,
    loading,
    error,
    page,
    setPage,
    category,
    setCategory,
    sort,
    setSort,
    refresh,
    totalPages
  } = useProducts({ initialPage: 1, pageSize: 12 });
  
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Catálogo de Produtos</h1>
        <Link href="/products/create">
          <Button className="flex items-center gap-2">
            <PlusCircle size={16} />
            Novo Produto
          </Button>
        </Link>
      </div>
      
      <ProductFilter
        categories={categories}
        selectedCategory={category}
        onCategoryChange={setCategory}
        sortDirection={sort}
        onSortChange={setSort}
        onRefresh={refresh}
      />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <ProductList products={products} isLoading={loading} />
      
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setPage(page > 1 ? page - 1 : 1)}
              className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => setPage(i + 1)}
                isActive={page === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
              className={page >= totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}