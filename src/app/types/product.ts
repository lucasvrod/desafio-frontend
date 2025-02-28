export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type ProductInput = Omit<Product, 'id' | 'rating'> & {
  rating?: {
    rate: number;
    count: number;
  };
};