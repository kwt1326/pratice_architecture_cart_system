import React from "react";
import styles from './ContentWrap.module.scss';

function ContentWrap(props: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.container}>
      {props.children}
    </div>
  )
}

export default ContentWrap