import { Suspense } from "react";
import Loading from "@/app/components/layout/Loading";
import { MessageDocument, ThreadDocument, UserDocument } from "@/app/page";
import { getUserV2 } from "@/app/components/utils/fetch/v2/user";
import { getMessagesV2, getMessageV2 } from "@/app/components/utils/fetch/v2/message";
import { redirect } from "next/navigation";
import ThreadHeader from "./thread/ThreadHeader";
import ThreadBody from "./ThreadBody";

export default async function Thread({
	thread,
	offset,
	limit,
	page,
	currentMessageId,
	currentMessageDone
}: {
	thread: ThreadDocument,
	offset?: number,
	limit?: number,
	page?: number,
	currentMessageId?: string,
	currentMessageDone?: boolean
}) {
	let author: UserDocument | null, messages: MessageDocument[];

	if(currentMessageId && !currentMessageDone) {
		const currentMessage: MessageDocument | null = await getMessageV2(currentMessageId);
		if(currentMessage) {
			let currentMessagePage: number = currentMessage.threadPage[`${limit ?? 20}`] ?? 1;
			[author, messages] = await Promise.all([
				getUserV2(thread.user),
				getMessagesV2(thread._id, (currentMessagePage - 1)*(limit ?? 20), limit ?? 20)
			]);

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
				redirect(`/threads/${thread._id}/page/${currentMessagePage}?messageId=${currentMessageId}&done=1`);
			}

			if(author) {
				return (
					<Suspense fallback={<Loading/>}>
						<ThreadHeader
							author={author}
							thread={thread}
						/>
						
						<ThreadBody
							thread={thread}
							messages={messages}
							page={page ?? 1}
							currentMessageId={currentMessageId}
						/>
					</Suspense>
				)
			}
		}
	}
	
	[author, messages] = await Promise.all([
		getUserV2(thread.user),
		getMessagesV2(thread._id, offset ?? 0, limit ?? 20)
	]);
	
	if(author) {
		return(
			<Suspense fallback={<Loading/>}>
				<ThreadHeader
					author={author}
					thread={thread}
				/>

				<ThreadBody
					thread={thread}
					messages={messages}
					page={page ?? 1}
					currentMessageId={currentMessageId}
				/>
			</Suspense>
		)
	}
}