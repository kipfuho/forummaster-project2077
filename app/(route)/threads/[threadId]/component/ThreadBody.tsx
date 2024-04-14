import { Suspense } from "react";
import Loading from "@/app/components/layout/Loading";
import { MessageDocument, ThreadDocument, UserDocument } from "@/app/page";
import { getUserV2 } from "@/app/components/utils/fetch/v2/user";
import { getMessagesV2 } from "@/app/components/utils/fetch/v2/message";
import ThreadContent from "./ThreadContent";
import MessageList from "./MessageList";

export default async function ThreadBody({thread, offset, limit, page}: {thread: ThreadDocument, offset?: number, limit?: number, page?: number}) {
	const [author, messages]: [UserDocument, MessageDocument[]] = await Promise.all([getUserV2(thread.user), getMessagesV2(thread._id, offset ?? 0, limit ?? 20)]);
	return(
		<Suspense fallback={<Loading/>}>
			<ThreadContent thread={thread} author={author} messages={messages} page={page}>
				<MessageList messages={messages}/>
			</ThreadContent>
		</Suspense>
	)
}