import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { productSchema, productUpdateSchema } from '../../validation/productSchema';
import { ProductInput, Product } from '../../types/product';
import { fetchCategories } from '../../services/api';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: ProductInput) => Promise<void>;
  isEditing?: boolean;
}

export const ProductForm = ({ 
  product, 
  onSubmit, 
  isEditing = false 
}: ProductFormProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const schema = isEditing ? productUpdateSchema : productSchema;
  
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: product?.title || '',
      price: product?.price || 0,
      description: product?.description || '',
      category: product?.category || '',
      image: product?.image || '',
    },
  });
  
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    };
    
    loadCategories();
  }, []);
  
  const handleSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setIsLoading(true);
      
      const productData: ProductInput = {
        ...values,
        category: isEditing ? product!.category : values.category,
      };
      
      await onSubmit(productData);
      
      router.push('/');
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Nome do produto" 
                  {...field} 
                  maxLength={30}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.01" 
                  min="0.01" 
                  placeholder="99.99" 
                  {...field}
                  value={field.value}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descrição do produto" 
                  className="resize-none" 
                  rows={4}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {!isEditing && (
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  disabled={isEditing}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL da imagem</FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://exemplo.com/imagem.jpg" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={() => router.push('/')}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Salvando...' : isEditing ? 'Atualizar' : 'Criar'}
          </Button>
        </div>
      </form>
    </Form>
  );
};