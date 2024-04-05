export default function ThreadPageNumber({params}: {params: {pageNumber: number}}) {
	return(
		<div>
			{params.pageNumber}
		</div>
	)
}