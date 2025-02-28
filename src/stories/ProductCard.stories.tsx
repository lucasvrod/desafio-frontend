import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from '../app/components/product/ProductCard';
import { Product } from '../app/types/product';

const sampleProduct: Product = {
  id: 1,
  title: 'Mens Casual Slim Fit',
  price: 15.99,
  description: 'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.',
  category: "men's clothing",
  image: 'https://via.placeholder.com/300',
  rating: {
    rate: 4.5,
    count: 120
  }
};

const meta = {
  title: 'E-commerce/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    product: {
      description: 'Dados do produto a ser exibido',
      control: 'object',
    },
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: sampleProduct,
  },
};

export const HighRating: Story = {
  args: {
    product: {
      ...sampleProduct,
      rating: {
        rate: 5.0,
        count: 350
      }
    },
  },
};

export const LowRating: Story = {
  args: {
    product: {
      ...sampleProduct,
      rating: {
        rate: 2.1,
        count: 45
      }
    },
  },
};

export const LongTitle: Story = {
  args: {
    product: {
      ...sampleProduct,
      title: 'John Hardy Womens Legends Naga Gold & Silver Dragon Station Chain Bracelet'
    },
  },
};