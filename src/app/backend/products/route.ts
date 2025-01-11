import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

/**
 * GET /api/products
 * Возвращает список товаров (опционально, если хотите просматривать)
 */
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products); // status 200 по умолчанию
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/**
 * POST /api/products
 * Создаёт новый товар в БД (используем в админ-форме)
 */
export async function POST(req: NextRequest) {
  try {
    // Получаем данные из тела запроса
    const { name, description, price } = await req.json();

    // Приводим price к float, чтобы не было ошибок с типами
    const numericPrice = parseFloat(price);

    // Сохраняем товар в базе
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: numericPrice,
      },
    });

    // Возвращаем созданный объект (JSON) со статусом 201
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
