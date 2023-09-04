import { useState } from "react";
import m from "./Pagination.module.css";
import './Pagination.css'

function Pagination({ totalPages, currentPage, onPageChange }) {
  const [pageRange, setPageRange] = useState(0); // Количество отображаемых номеров страниц

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
  
    let start = Math.max(currentPage - pageRange, 1); // Используем Math.max() для предотвращения отрицательных значений
    let end = Math.min(currentPage + pageRange, totalPages); // Используем Math.min() для предотвращения превышения общего количества страниц
  
    // Добавляем условие, чтобы диапазон не выходил за границы страниц
    if (start > totalPages - 2 * pageRange) {
      start = Math.max(totalPages - 2 * pageRange, 1);
      end = totalPages;
    }
  
    for (let page = start; page <= end; page++) {
      pageNumbers.push(
        <li
          key={page}
          className={`page-item__number ${currentPage === page ? 'active' : ''}`}
          onClick={() => handlePageChange(page)}
        >
          <span className="page-number">{page}</span>
        </li>
      );
    }
  
    return pageNumbers;
  };

  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <nav className={m.nav}>
          <ul className={m.ul}>
            <li
              className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <span className="page-link">{"<"}</span>
            </li>
            {renderPageNumbers()}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <span className="page-link">{">"}</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Pagination;
