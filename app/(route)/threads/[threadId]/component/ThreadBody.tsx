import { Suspense } from "react";
import Loading from "@/app/components/layout/Loading";
import { MessageDocument, ThreadDocument, UserDocument } from "@/app/page";
import { getUserV2 } from "@/app/components/utils/fetch/v2/user";
import { getMessagesV2, getMessageV2 } from "@/app/components/utils/fetch/v2/message";
import ThreadContent from "./ThreadContent";
import MessageList from "./MessageList";

async function DefaultPage({thread, offset, limit, page}: {thread: ThreadDocument, offset?: number, limit?: number, page?: number}) {
	const [author, messages]: [UserDocument, MessageDocument[]] = await Promise.all([getUserV2(thread.user), getMessagesV2(thread._id, offset ?? 0, limit ?? 20)]);
	
	return(
		<Suspense fallback={<Loading/>}>
			<ThreadContent thread={thread} author={author} messages={messages} page={page}>
				<MessageList messages={messages}/>
			</ThreadContent>
		</Suspense>
	)
}

export default async function ThreadBody({thread, currentMessageId, offset, limit, page}: {thread: ThreadDocument, currentMessageId: string | undefined, offset?: number, limit?: number, page?: number}) {
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
			
			return(
				<Suspense fallback={<Loading/>}>
					<ThreadContent thread={thread} author={author} messages={messages} page={currentMessagePage} currentMessageId={currentMessageId}>
						<MessageList messages={messages}/>
					</ThreadContent>
				</Suspense>
			)
		}
	}

	const [author, messages]: [UserDocument, MessageDocument[]] = await Promise.all([getUserV2(thread.user), getMessagesV2(thread._id, offset ?? 0, limit ?? 20)]);
			
	return(
		<Suspense fallback={<Loading/>}>
			<ThreadContent thread={thread} author={author} messages={messages} page={page}>
				<MessageList messages={messages}/>
			</ThreadContent>
		</Suspense>
	)
}