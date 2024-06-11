'use client'
import { useSearchParams } from "next/navigation"

export default function SearchMember() {
	const searchParams = useSearchParams();
	const userId = searchParams.get("userId");

	return (
		<div>
			{userId}
		</div>
	)
}