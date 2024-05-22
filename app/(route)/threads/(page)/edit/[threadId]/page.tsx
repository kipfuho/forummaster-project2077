import { getSectionId } from "@/app/components/utils/HelperFunction";
import ThreadEditBody from "../../../components/ThreadEditBody";
import { Suspense } from "react";
import { getThreadAndMessage } from "@/app/components/utils/fetch/v1/thread";
import { getThreadV2 } from "@/app/components/utils/fetch/v2/thread";
import { getMessagesV2 } from "@/app/components/utils/fetch/v2/message";
import { MessageDocument, ThreadDocument } from "@/app/page";

// edit thread page
export default async function EditThread({params}: {params: {threadId: string}}) {
	const [thread, message]: [ThreadDocument | null, MessageDocument[]] = await Promise.all([getThreadV2(params.threadId), getMessagesV2(params.threadId, 0, 1)]);

	if(thread) {
		return(
			<Suspense>
				<ThreadEditBody thread={thread} message={message[0]}/>
			</Suspense>
		)
	} else {
		return (
			<p>Something went wrong!</p>
		)
	}
}