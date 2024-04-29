import Loading from "@/app/components/layout/Loading";
import { Suspense } from "react";
import ThreadBody from "./component/ThreadBody";
import { getThreadV2 } from "@/app/components/utils/fetch/v2/thread";
import { ThreadDocument } from "@/app/page";

export default async function Thread({params, searchParams}: {params: {threadId: string}, searchParams?: { [key: string]: string | undefined }}) {
	const thread: ThreadDocument = await getThreadV2(params.threadId);
	return(
		<Suspense fallback={<Loading/>}>
      <ThreadBody thread={thread} currentMessageId={searchParams?.messageId}/>
    </Suspense>
	)
}