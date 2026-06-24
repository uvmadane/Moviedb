import React from "react"
import "../styles/pagination.css"

const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="chevron-icon">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
)

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="chevron-icon">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
)

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
      window.scrollTo({ top: 0, behavior: "smooth" }) // Smooth scroll to top on page change
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
      window.scrollTo({ top: 0, behavior: "smooth" }) // Smooth scroll to top on page change
    }
  }

  const handlePageClick = (page) => {
    onPageChange(page)
    window.scrollTo({ top: 0, behavior: "smooth" }) // Smooth scroll to top on page change
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
          aria-label={`Page ${i}`}
          aria-current={i === currentPage ? "page" : undefined}
        >
          {i}
        </button>
      )
    }

    return pageNumbers
  }

  return (
    <div className="pagination-container">
      <button
        className="page-nav prev-btn"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        <ChevronLeft />
        <span className="nav-btn-text">Previous</span>
      </button>

      <div className="page-numbers-wrapper">
        {renderPageNumbers()}
      </div>

      <button
        className="page-nav next-btn"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
      >
        <span className="nav-btn-text">Next</span>
        <ChevronRight />
      </button>
    </div>
  )
}

export default Pagination
