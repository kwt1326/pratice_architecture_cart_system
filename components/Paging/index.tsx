import React from "react";
import styles from './Paging.module.scss';

const Paging = (props: {
  perGroupPage?: number; // 페이징 묶음당 표시할 숫자 수
  currentPage: number;
  totalPage: number;
  movePageFunc: Function;
}) => {
  const _perGroupPage = props.perGroupPage || 5;
  const _totalPage = props.totalPage || 0;
  const _currentPage = props.currentPage > _totalPage ? _totalPage : props.currentPage;
  const currentStandardLow = Math.floor((_currentPage % _perGroupPage === 0) ? (_currentPage - _perGroupPage) : (_currentPage - (_currentPage % _perGroupPage)));
  const currentStandardMax = Math.floor(currentStandardLow + _perGroupPage > _totalPage ? _totalPage : currentStandardLow + _perGroupPage);
  const count = currentStandardMax - currentStandardLow;

  if (_totalPage > 0) {
    return (
      <div className={styles.paging_container}>
        {
          _currentPage > 1 && (
            <span
              className={styles.prev_page}
              onClick={() => {
                if (_currentPage > 1) {
                  props.movePageFunc(_currentPage - 1)
                }
              }}
            >{'<'}</span>
          )
        }
        {
          [...new Array(count)].map((_, index) => {
            const page = currentStandardLow + (index + 1);
            if (page === _currentPage) {
              return (
                <span
                  key={index}
                  className={styles.current_page}
                >{page}</span>
              )
            }
            return (
              <span
                key={index}
                className={styles.other_page}
                onClick={() => props.movePageFunc(page)}
              >{page}</span>
            )
          })
        }
        {
          _currentPage !== _totalPage && (
            <span
              className={styles.next_page}
              onClick={() => {
                if (_totalPage > _currentPage) {
                  props.movePageFunc(_currentPage + 1)
                }
              }}
            >{'>'}</span>
          )
        }
      </div>
    )
  }
  return null;
}

export default Paging