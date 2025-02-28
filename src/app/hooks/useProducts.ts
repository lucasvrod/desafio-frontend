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
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<'asc' | 'desc' | undefined>(initialSort);

  const loadAllProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchProducts(100, 0);
      setAllProducts(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar produtos. Tente novamente mais tarde.');
      console.error('Erro ao carregar todos os produtos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const applyFiltersAndSort = useCallback(() => {
    try {
      let result = [...allProducts];
      
      if (category) {
        result = result.filter(product => product.category === category);
      }
      
      result = [...result].sort((a, b) => {
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
      
      setFilteredProducts(result);
      
    } catch (err) {
      console.error('Erro ao aplicar filtros:', err);
    }
  }, [allProducts, category, sort]);

  const applyPagination = useCallback(() => {
    const startIndex = (page - 1) * pageSize;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);
    setProducts(paginatedProducts);
  }, [filteredProducts, page, pageSize]);

  const loadCategories = useCallback(async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      console.error('Erro ao carregar categorias:', err);
    }
  }, []);

  useEffect(() => {
    loadAllProducts();
    loadCategories();
  }, [loadAllProducts, loadCategories]);

  useEffect(() => {
    if (allProducts.length > 0) {
      applyFiltersAndSort();
    }
  }, [allProducts, category, sort, applyFiltersAndSort]);

  useEffect(() => {
    applyPagination();
  }, [page, filteredProducts, applyPagination]);

  const refresh = useCallback(() => {
    setCategory(undefined);
    setSort(undefined);
    setPage(initialPage);
    loadAllProducts();
  }, [loadAllProducts, initialPage]);

  return {
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
    totalItems: filteredProducts.length,
    totalPages: Math.ceil(filteredProducts.length / pageSize) || 1
  };
};