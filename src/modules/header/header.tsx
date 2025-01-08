import { FC } from 'react'
import classNames from 'classnames'

import styles from './header.module.scss'
import { HeaderProps } from './header.types'
import LogoDaimyo from '@icons/logo.svg'
import Image from 'next/image'

const Header: FC<HeaderProps> = ({ className }) => {

  const headerClassName = classNames(styles.root, className)

  return (
    <header className={headerClassName}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <LogoDaimyo />
        </div>
        <div>
          <p className={styles.text}>
            About
          </p>
        </div>
      </div>
      <div className={styles.right}>
        <div>
          <button className={styles.text}>
            CART
          </button>
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
