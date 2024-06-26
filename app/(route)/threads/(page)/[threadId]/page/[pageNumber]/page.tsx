import { Suspense } from "react";
import Loading from "@/app/components/layout/Loading";
import { ThreadDocument, } from "@/app/page";
import { getThreadV2 } from "@/app/components/utils/fetch/v2/thread";
import Thread from "../../../../components/Thread";

export default async function ThreadPageNumber({
	params,
	searchParams
}: {
	params: {threadId: string, pageNumber: number},
	searchParams?: { [key: string]: string | undefined }
}) {
	const thread: ThreadDocument | null = await getThreadV2(params.threadId);

	if(thread) {
		if(searchParams?.messageId) {
			return(
				<Suspense fallback={<Loading/>}>
					<Thread
						thread={thread}
						offset={(params.pageNumber - 1)*20}
						page={params.pageNumber}
						currentMessageId={searchParams.messageId}
						currentMessageDone={searchParams.done ? !!searchParams.done : undefined}
					/>
				</Suspense>
			)
		} else {
			return(
				<Suspense fallback={<Loading/>}>
					<Thread
						thread={thread}
						offset={(params.pageNumber - 1)*20}
						page={params.pageNumber}
					/>
				</Suspense>
			)
		}
	} else {
		return (
			<p>Something went wrong!</p>
		)
	}
}