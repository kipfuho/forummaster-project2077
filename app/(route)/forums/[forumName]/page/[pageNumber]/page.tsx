export default function PageNumber({params}: {params: {pageNumber: number}}) {
	return(
		<main>
			{params.pageNumber}
		</main>
	)
}