import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
  import { Product } from "../../types/product";
  
  interface DeleteConfirmationProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
  }
  
  export const DeleteConfirmation = ({
    product,
    isOpen,
    onClose,
    onConfirm,
  }: DeleteConfirmationProps) => {
    const handleConfirm = async () => {
      await onConfirm();
      onClose();
    };
  
    if (!product) return null;
  
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o produto &quot;{product.title}&quot;?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className="bg-red-500 hover:bg-red-600"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };