'use client';

import React, { useContext } from 'react';
import { CartContext } from '@/components/cartProvider/cartProvider'; // проверьте правильность пути

type Product = {
  id: string;
  name: string;
  price: number;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useContext(CartContext);

  function handleClick() {
    console.log('Добавление в корзину:', product); // Добавьте лог для проверки
    addToCart(product);
  }

  return <button onClick={handleClick}>Добавить в корзину</button>;
}
