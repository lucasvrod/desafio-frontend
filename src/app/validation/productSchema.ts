import { z } from 'zod';

export const productSchema = z.object({
  title: z
    .string()
    .min(1, 'O título é obrigatório')
    .max(30, 'O título não pode ter mais que 30 caracteres'),
  price: z
    .number()
    .min(0.01, 'O preço deve ser maior que zero')
    .or(z.string().regex(/^\d+(\.\d{1,2})?$/).transform(Number)),
  description: z
    .string()
    .min(1, 'A descrição é obrigatória'),
  category: z
    .string()
    .min(1, 'A categoria é obrigatória'),
  image: z
    .string()
    .url('Insira uma URL válida para a imagem')
});

export const productUpdateSchema = productSchema.omit({ category: true });