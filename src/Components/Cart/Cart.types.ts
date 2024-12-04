import { CartItem } from "../../Context";


export interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: number) => void;
  calculateTotal: () => number;
}
