import { FC } from 'react'
import classNames from 'classnames'

import styles from './home.module.scss'
import { HomeProps } from './home.types'
import { Items } from '@/modules/items'

const Home: FC<HomeProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName} style={{borderTop: "2px solid black"}}>
      <Items />
    </main>
  )
}

export default Home
