import classNames from 'classnames'

import styles from './items.module.scss'
import { ItemsProps } from './items.types'
import { PrismaClient } from '@prisma/client';
import { AddToCartButton } from '@/ui';

const prisma = new PrismaClient();

export default async function Items({ className }: ItemsProps) {
  const products = await prisma.product.findMany()

  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <h1>Каталог товаров</h1>
      <ul>
        {products.map(prod => (
          <li key={prod.id}>
            {prod.name} - {prod.price}
            <AddToCartButton product={prod} />
          </li>
        ))}
      </ul>
    </div>
  )
}
