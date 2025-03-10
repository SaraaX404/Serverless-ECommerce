import { createContext, useContext, useState, ReactNode } from 'react';
import { CartContextType, CartItem, Product } from './Cart.types';

// We don't use localStorage to persist cart data because this is a demo app without a backend.
// User authentication is handled via React state, so when the browser refreshes, all state including
// the login session is cleared. Therefore, it makes sense to also clear the cart on refresh to maintain
// consistency with the authentication state.

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...currentItems, { product, quantity: 1 }];
    });
  };

  const removeItem = (productId: number) => {
    setItems(currentItems => 
      currentItems.filter(item => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
