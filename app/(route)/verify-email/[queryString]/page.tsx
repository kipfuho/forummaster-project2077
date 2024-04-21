import Loading from "@/app/components/layout/Loading";
import { verifyEmailV2 } from "@/app/components/utils/fetch/v2/user"
import { Button } from "@mui/material";
import Link from "next/link";
import { Suspense } from "react";

export default async function VerifyEmail({params}: {params: {queryString: string}}) {
	const result = await verifyEmailV2(decodeURIComponent(params.queryString));
	if(result && result.type === 'success') {
		return (
			<Suspense fallback={<Loading/>}>
				<p>Verified successfully</p>
				<Link href='/'>
					<Button>Go back home</Button>
				</Link>
			</Suspense>
		)
	} else {
		return (
			<Suspense fallback={<Loading/>}>
				<p>Verified failed, check your verification link again</p>
			</Suspense>
		)
	}
}