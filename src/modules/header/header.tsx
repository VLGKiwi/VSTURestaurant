import { FC } from 'react'
import classNames from 'classnames'

import styles from './header.module.scss'
import { HeaderProps } from './header.types'
import LogoDaimyo from '@icons/logo.svg'
import Image from 'next/image'
import Link from 'next/link'

const Header: FC<HeaderProps> = ({ className }) => {

  const headerClassName = classNames(styles.root, className)

  return (
    <header className={headerClassName}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link href={'/'}>
            <LogoDaimyo />
          </Link>
        </div>
        <div>
          <p className={styles.text}>
            About
          </p>
          <Link href={'/admin'}>
            admin
          </Link>
        </div>
      </div>
      <div className={styles.right}>
        <div>
          <Link href='/cart' className={styles.text}>
            CART
          </Link>
        </div>
        <div className={styles.img}>
          <Image
            src={'/images/cat.png'}
            alt='cat'
            width={171}
            height={97}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
