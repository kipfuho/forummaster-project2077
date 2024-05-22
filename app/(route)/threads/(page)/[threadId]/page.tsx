import Loading from "@/app/components/layout/Loading";
import { Suspense } from "react";
import { getThreadV2 } from "@/app/components/utils/fetch/v2/thread";
import Thread from "../../components/Thread";

export default async function ThreadPage({
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
					<Thread
						thread={thread}
						currentMessageId={searchParams.messageId}
					/>
				</Suspense>
			)
		} else {
			return(
				<Suspense fallback={<Loading/>}>
					<Thread thread={thread}/>
				</Suspense>
			)
		}
	} else {
		return (
			<p>Something went wrong!</p>
		)
	}
}