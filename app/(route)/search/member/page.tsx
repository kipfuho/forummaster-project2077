'use client'
import { useSearchParams } from "next/navigation"

export default function SearchMember({params}: {params: {queryString: string}}) {
	const searchParams = useSearchParams();
	const userId = searchParams.get("userId");
	return (
		<div>
			userId={userId}
		</div>
	)
}