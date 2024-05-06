import { Suspense } from "react";
import Loading from "@/app/components/layout/Loading";
import { MessageDocument, ThreadDocument, UserDocument } from "@/app/page";
import { getUserV2 } from "@/app/components/utils/fetch/v2/user";
import { getMessagesV2, getMessageV2 } from "@/app/components/utils/fetch/v2/message";
import ThreadContent from "./ThreadContent";
import MessageList from "./message/MessageList";
import { redirect } from "next/navigation";

export default async function ThreadBody({thread, currentMessageId, offset, limit, page}: {thread: ThreadDocument, currentMessageId?: string, offset?: number, limit?: number, page?: number}) {
	if(currentMessageId) {
		const currentMessage: MessageDocument = await getMessageV2(currentMessageId);
		if(currentMessage) {
			console.log(currentMessage);
			let currentMessagePage: number = currentMessage.threadPage[`${limit ?? 20}`] ?? 1;
			let [author, messages]: [UserDocument, MessageDocument[]] = await Promise.all([getUserV2(thread.user), getMessagesV2(thread._id, (currentMessagePage - 1)*(limit ?? 20), limit ?? 20)]);

			// Check if messages has currentMessage
			if(currentMessagePage > 1) {
				while (messages.some((message) => {
					return message._id === currentMessageId;
				}) === false && currentMessagePage > 1) {
					currentMessagePage--;
					messages = await getMessagesV2(thread._id, (currentMessagePage - 1)*(limit ?? 20), limit ?? 20);
				}
			}

			if(currentMessagePage != page) {
				redirect(`/threads/${thread._id}/page/${currentMessagePage}?messageId=${currentMessageId}`);
			}
			
			return(
				<Suspense fallback={<Loading/>}>
					<ThreadContent thread={thread} author={author} page={currentMessagePage} currentMessageId={currentMessageId}>
						<MessageList messages={messages}/>
					</ThreadContent>
				</Suspense>
			)
		}
	}

	const [author, messages]: [UserDocument, MessageDocument[]] = await Promise.all([getUserV2(thread.user), getMessagesV2(thread._id, offset ?? 0, limit ?? 20)]);
			
	return(
		<Suspense fallback={<Loading/>}>
			<ThreadContent thread={thread} author={author} page={page}>
				<MessageList messages={messages}/>
			</ThreadContent>
		</Suspense>
	)
}