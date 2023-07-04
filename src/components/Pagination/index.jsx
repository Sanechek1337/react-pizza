import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

const Pagination = ({ currentPage, setCurrentPage }) => {
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel=">"
			previousLabel="<"
			onPageChange={(event) => setCurrentPage(event.selected + 1)}
			pageRangeDisplayed={8}
			pageCount={3}
			forcePage={currentPage - 1}
		/>
	);
}

export default Pagination;
