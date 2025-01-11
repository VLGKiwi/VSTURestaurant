import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Создание нового заказа (POST /api/orders)
export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json() as {
      items: { id: string; quantity: number }[];
    };

    // Получаем товары из БД
    const productIds = items.map((item) => item.id);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    // Подсчитаем итоговую стоимость
    let totalPrice = 0;
    products.forEach((product) => {
      const qty = items.find((i) => i.id === product.id)?.quantity || 1;
      totalPrice += product.price * qty;
    });

    // Создаём заказ
    const order = await prisma.order.create({
      data: {
        totalPrice,
      },
    });

    // Формируем JSON-ответ вручную
    const jsonResponse = JSON.stringify(order);
    return new Response(jsonResponse, {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    const errorResponse = JSON.stringify({ error: 'Server error' });
    return new Response(errorResponse, {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
