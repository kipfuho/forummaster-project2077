import Loading from "@/app/components/layout/Loading";
import { Suspense } from "react";
import ThreadBody from "./component/ThreadBody";
import { getThreadV2 } from "@/app/components/utils/fetch/v2/thread";
import { ThreadDocument } from "@/app/page";

export default async function Thread({
	params,
	searchParams
}: {
	params: {threadId: string},
	searchParams?: { [key: string]: string | undefined }
}) {
	const thread = await getThreadV2(params.threadId);
	if(thread) {
		if(searchParams?.messageId) {
			return(
				<Suspense fallback={<Loading/>}>
					<ThreadBody
						thread={thread}
						currentMessageId={searchParams.messageId}
					/>
				</Suspense>
			)
		} else {
			return(
				<Suspense fallback={<Loading/>}>
					<ThreadBody thread={thread}/>
				</Suspense>
			)
		}
	} else {
		return (
			<p>Something went wrong!</p>
		)
	}
}