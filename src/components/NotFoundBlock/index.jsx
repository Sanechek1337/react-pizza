import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
	return (
		<div className={styles.root}>
			<h1 >
				<span>😕</span>
				<br />
				Страница не найдена
			</h1>
			<p>К сожалению данная страница отсутствует в нашем интернет-магазине</p>
		</div>
	);
}

export default NotFoundBlock;