// app/cart/page.tsx
'use client';

import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CartContext } from '@/components/cartProvider/cartProvider';

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  const router = useRouter();

  // Логирование для отладки состояния корзины
  useEffect(() => {
    console.log('Товары в корзине на странице CartPage:', cartItems);
  }, [cartItems]);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  async function handleCheckout() {
    const items = cartItems.map(item => ({
      id: item.id,
      quantity: item.quantity,
    }));

    try {
      const res = await fetch('/backend/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      // Получаем текст ответа для диагностики
      const responseText = await res.text();
      console.log('Ответ от сервера:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        throw new Error('Неверный формат JSON в ответе от сервера.');
      }

      if (!res.ok) {
        throw new Error(data.error || 'Не удалось оформить заказ');
      }

      console.log('Заказ создан:', data);
      clearCart();
      router.push('/thank-you');
    } catch (error: any) {
      console.error(error);
      alert(`Ошибка при оформлении заказа: ${error.message}`);
    }
  }

  return (
    <main>
      <h1>Ваша корзина</h1>
      {cartItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <div>
                  <h2>{item.name}</h2>
                  <p>Цена: {item.price} ₽</p>
                  <p>Количество: {item.quantity}</p>
                  <p>Итого: {item.price * item.quantity} ₽</p>
                </div>
                <div>
                  <button onClick={() => addToCart(item, 1)}>+</button>
                  <button onClick={() => removeFromCart(item.id)}>-</button>
                </div>
              </li>
            ))}
          </ul>
          <h2>Общая стоимость: {totalPrice} ₽</h2>
          <button onClick={handleCheckout}>
            Оформить заказ
          </button>
        </>
      )}
    </main>
  );
}
