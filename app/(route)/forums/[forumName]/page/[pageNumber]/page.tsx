export default function PageNumber({params}: {params: {pageNumber: number}}) {
	return(
		<div>
			{params.pageNumber}
		</div>
	)
}