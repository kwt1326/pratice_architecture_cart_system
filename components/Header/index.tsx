import Link from 'next/link';
import React from 'react';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <h1>장바구니 (아키텍처 연습용)</h1>
      <ul>
        <li>
          <Link href='/products'>
            <a><h3>상품목록</h3></a>
          </Link>
        </li>
        <li>
          <Link href='/cart'>
            <a><h3>장바구니</h3></a>
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header