import { renderHook, act } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { useProducts } from '../../app/hooks/useProducts';
import { fetchProducts, fetchCategories } from '../../app/services/api';

import '@testing-library/jest-dom';

jest.mock('../../app/services/api', () => ({
  fetchProducts: jest.fn(),
  fetchCategories: jest.fn(),
}));

describe('useProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (fetchProducts as jest.Mock).mockResolvedValue([
      { id: 1, name: 'Produto 1', price: 100, rating: { rate: 4.0, count: 10 } },
      { id: 2, name: 'Produto 2', price: 200, rating: { rate: 4.8, count: 20 } },
    ]);

    (fetchCategories as jest.Mock).mockResolvedValue(['cat1', 'cat2']);
  });

  it('should fetch products and categories on mount', async () => {
    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toHaveLength(2);
    expect(result.current.categories).toHaveLength(2);
    expect(result.current.error).toBe(null);
  });

  it('should update filters and reload products', async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    (fetchProducts as jest.Mock).mockResolvedValueOnce([
      { id: 3, name: 'Produto 3', price: 150, rating: { rate: 4.9, count: 15 } },
    ]);

    await act(async () => {
      result.current.setCategory('cat1');
    });

    await waitFor(() => {
      expect(result.current.products[0].id).toBe(3);
    });

    expect(result.current.category).toBe('cat1');
  });

  it('should prioritize products with high ratings', async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products[0].rating.rate).toBe(4.8);
    expect(result.current.products[1].rating.rate).toBe(4.0);
  });

  it('should handle errors when fetching products fails', async () => {
    (fetchProducts as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(
      'Erro ao carregar produtos. Tente novamente mais tarde.'
    );
    expect(result.current.products).toHaveLength(0);
  });
});