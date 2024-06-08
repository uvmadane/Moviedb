import React from "react"
import "../styles/pagination.css"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handlePageClick = (page) => {
    onPageChange(page)
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5
    let startPage, endPage

    if (totalPages <= maxPagesToShow) {
      startPage = 1
      endPage = totalPages
    } else {
      const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2)
      if (currentPage <= halfMaxPagesToShow) {
        startPage = 1
        endPage = maxPagesToShow
      } else if (currentPage + halfMaxPagesToShow >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1
        endPage = totalPages
      } else {
        startPage = currentPage - halfMaxPagesToShow
        endPage = currentPage + halfMaxPagesToShow
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`page-number ${i === currentPage ? "active" : ""}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      )
    }

    return pageNumbers
  }

  return (
    <div className="pagination">
      <button
        className="page-nav"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        className="page-nav"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
