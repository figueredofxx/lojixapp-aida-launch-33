
import { useState } from 'react';

export interface CartItem {
  id: number;
  nome: string;
  codigo: string;
  preco: number;
  quantidade: number;
  desconto: number;
  total: number;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (produto: any) => {
    const existingItem = cartItems.find(item => item.id === produto.id);
    if (existingItem) {
      updateQuantity(produto.id, existingItem.quantidade + 1);
    } else {
      setCartItems([...cartItems, {
        id: produto.id,
        nome: produto.nome,
        codigo: produto.codigo,
        preco: produto.preco,
        quantidade: 1,
        desconto: 0,
        total: produto.preco
      }]);
    }
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id 
          ? { ...item, quantidade: newQuantity, total: (item.preco * newQuantity) - item.desconto }
          : item
      ));
    }
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal
  };
};
