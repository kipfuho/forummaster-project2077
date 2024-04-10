import { getSectionId } from "@/app/components/utils/HelperFunction";
import ThreadEditBody from "./component/ThreadEditBody";
import { Suspense } from "react";
import { getThreadAndMessage } from "@/app/components/utils/fetch/v1/thread";

// edit thread page
export default async function EditThread({params}: {params: {threadName: string}}) {
	const thread_id = getSectionId(params.threadName);
	const threadData = await getThreadAndMessage(thread_id);

	return(
		<Suspense>
			<ThreadEditBody threadData={threadData}/>
		</Suspense>
	)
}