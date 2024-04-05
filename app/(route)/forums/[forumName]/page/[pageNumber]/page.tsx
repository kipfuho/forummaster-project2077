export default function ForumPageNumber({params}: {params: {pageNumber: number}}) {
	return(
		<div>
			{params.pageNumber}
		</div>
	)
}