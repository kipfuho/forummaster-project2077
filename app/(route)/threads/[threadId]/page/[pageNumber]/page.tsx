import { Suspense } from "react";
import ThreadBody from "../../component/ThreadBody";
import Loading from "@/app/components/layout/Loading";
import { ThreadDocument, } from "@/app/page";
import { getThreadV2 } from "@/app/components/utils/fetch/v2/thread";

export default async function ThreadPageNumber({params}: {params: {threadId: string, pageNumber: number}}) {
	const thread: ThreadDocument = await getThreadV2(params.threadId);
	return(
		<Suspense fallback={<Loading/>}>
			<ThreadBody thread={thread} offset={(params.pageNumber - 1)*20} page={params.pageNumber}/>
		</Suspense>
	)
}