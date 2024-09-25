import PropTypes from "prop-types";
import { Pagination } from "react-bootstrap"; // Use React-Bootstrap's Pagination component

const CustomPagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    if (totalPages <= 5) {
      return pageNumbers.map((number) => (
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => onPageChange(number)}
        >
          {number}
        </Pagination.Item>
      ));
    } else {
      const firstFive = pageNumbers.slice(0, 5);
      const lastPage = pageNumbers[totalPages - 1];

      return firstFive
        .map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => onPageChange(number)}
          >
            {number}
          </Pagination.Item>
        ))
        .concat(<Pagination.Ellipsis key="ellipsis" disabled />)
        .concat(
          <Pagination.Item
            key={lastPage}
            active={lastPage === currentPage}
            onClick={() => onPageChange(lastPage)}
          >
            {lastPage}
          </Pagination.Item>
        );
    }
  };

  return (
    <Pagination>
      {currentPage > 1 && (
        <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} />
      )}
      {renderPageNumbers()}
      {currentPage < totalPages && (
        <Pagination.Next onClick={() => onPageChange(currentPage + 1)} />
      )}
    </Pagination>
  );
};

CustomPagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default CustomPagination;
