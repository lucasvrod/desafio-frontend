import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types/product';
import { fetchProducts, fetchCategories } from '../services/api';

interface UseProductsProps {
  initialPage?: number;
  pageSize?: number;
  initialCategory?: string;
  initialSort?: 'asc' | 'desc';
}

export const useProducts = ({
  initialPage = 1,
  pageSize = 10,
  initialCategory,
  initialSort,
}: UseProductsProps = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<'asc' | 'desc' | undefined>(initialSort);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchProducts(
        pageSize,
        (page - 1) * pageSize,
        category,
        sort
      );
      
      const sortedProducts = [...data].sort((a, b) => {
        const aIsHighRated = a.rating.rate > 4.5;
        const bIsHighRated = b.rating.rate > 4.5;
        
        if (aIsHighRated && !bIsHighRated) return -1;
        if (!aIsHighRated && bIsHighRated) return 1;
        
        if (sort === 'asc') {
          return a.price - b.price;
        } else if (sort === 'desc') {
          return b.price - a.price;
        }
        
        return 0;
      });
      
      setProducts(sortedProducts);
      setFilteredProducts(sortedProducts);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar produtos. Tente novamente mais tarde.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, category, sort]);

  const loadCategories = useCallback(async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      console.error('Erro ao carregar categorias:', err);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    products,
    filteredProducts,
    categories,
    loading,
    error,
    page,
    setPage,
    category,
    setCategory,
    sort,
    setSort,
    refresh: loadProducts,
  };
};