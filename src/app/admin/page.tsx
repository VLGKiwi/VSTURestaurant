'use client'; // Обязательно, чтобы использовать useState, onSubmit, fetch и т.д.

import React, { useState, FormEvent } from 'react';

export default function AdminPage() {
  // Локальные стейты для данных формы
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  // Обработчик отправки формы
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // не даём перезагрузиться странице

    // Подготовим объект с данными
    const newProduct = {
      name,
      description,
      price,
    };

    try {
      // Отправляем POST-запрос на наш API-роут /api/products
      const res = await fetch('/backend/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        throw new Error('Не удалось создать товар');
      }

      // Ответ (JSON) с данными нового товара
      const data = await res.json();
      console.log('Товар создан:', data);

      // Сбросим поля формы
      setName('');
      setDescription('');
      setPrice('');

      alert('Товар успешно добавлен!');

    } catch (error) {
      console.error(error);
      alert('Ошибка при создании товара');
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Админ: Добавить товар</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: 10 }}>
          <label>Название:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Описание:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Цена:</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        <button type="submit" style={{ padding: '8px 16px' }}>
          Создать товар
        </button>
      </form>
    </main>
  );
}
