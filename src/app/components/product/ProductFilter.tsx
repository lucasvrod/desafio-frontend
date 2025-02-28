import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  SortAsc, 
  SortDesc, 
  RefreshCw 
} from 'lucide-react';

interface ProductFilterProps {
  categories: string[];
  selectedCategory?: string;
  onCategoryChange: (category: string | undefined) => void;
  sortDirection?: 'asc' | 'desc';
  onSortChange: (direction: 'asc' | 'desc' | undefined) => void;
  onRefresh: () => void;
}

export const ProductFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  sortDirection,
  onSortChange,
  onRefresh,
}: ProductFilterProps) => {
  const handleCategoryChange = (value: string) => {
    if (value === 'all') {
      onCategoryChange(undefined);
    } else {
      onCategoryChange(value);
    }
  };

  const toggleSort = () => {
    if (!sortDirection || sortDirection === 'desc') {
      onSortChange('asc');
    } else {
      onSortChange('desc');
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-grow">
        <Select 
          value={selectedCategory || 'all'} 
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={toggleSort} 
          className="flex items-center gap-2"
        >
          {sortDirection === 'asc' ? (
            <>
              <SortAsc size={16} />
              <span>Preço: Menor para Maior</span>
            </>
          ) : sortDirection === 'desc' ? (
            <>
              <SortDesc size={16} />
              <span>Preço: Maior para Menor</span>
            </>
          ) : (
            <>
              <SortAsc size={16} />
              <span>Ordenar por preço</span>
            </>
          )}
        </Button>
        
        <Button 
          variant="ghost" 
          onClick={onRefresh} 
          title="Atualizar"
        >
          <RefreshCw size={16} />
        </Button>
      </div>
    </div>
  );
};