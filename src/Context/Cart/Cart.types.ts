export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    stock: number;
    rating: number;
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
  }
  
  export interface CartContextType {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    total: number;
  }