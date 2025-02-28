import { render, screen } from '@testing-library/react';
import { ProductCard } from '../../app/components/product/ProductCard';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: unknown) => {
    return <img {...props} />;
  },
}));

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test description for the product',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/1.jpg',
    rating: {
      rate: 4.8,
      count: 120,
    },
  };

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    
    expect(screen.getByText('electronics')).toBeInTheDocument();
    
    expect(screen.getByText(/4.8\s*\(\s*120\s*\)/)).toBeInTheDocument();
  });

  it('truncates long titles correctly', () => {
    const longTitleProduct = {
      ...mockProduct,
      title: 'This is a very very very very very very very long product title that should be truncated',
    };
    
    render(<ProductCard product={longTitleProduct} />);
    
    const titleElement = screen.getByTitle(longTitleProduct.title);
    expect(titleElement.textContent).toMatch(/This is a very very very.../);
  });

  it('applies highlight styling for high-rated products', () => {
    render(<ProductCard product={mockProduct} />);
    
    const card = screen.getByText('Test Product').closest('.ring-2');
    expect(card).toBeInTheDocument();
  });

  it('does not apply highlight styling for low-rated products', () => {
    const lowRatedProduct = {
      ...mockProduct,
      rating: {
        rate: 3.5,
        count: 120,
      },
    };
    
    render(<ProductCard product={lowRatedProduct} />);
    
    const card = screen.getByText('Test Product').closest('div');
    expect(card).not.toHaveClass('ring-2');
  });
});