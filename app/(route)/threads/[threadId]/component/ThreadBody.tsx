import { Suspense } from "react";
import Loading from "@/app/components/layout/Loading";
import { MessageDocument, ThreadDocument, UserDocument } from "@/app/page";
import { getUserV2 } from "@/app/components/utils/fetch/v2/user";
import { getMessagesV2, getMessageV2 } from "@/app/components/utils/fetch/v2/message";
import MessageList from "./message/MessageList";
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PersonIcon from '@mui/icons-material/Person';
import { redirect } from "next/navigation";
import { smartTimeConvert } from "@/app/components/utils/HelperFunction";
import EditThreadButton from "./thread/EditThreadButton";
import Pagination from "@/app/components/ui/Pagination/Pagination";
import ReplyThread from "./thread/replyBox/ReplyThread";

export default async function ThreadBody({
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
	let author: UserDocument, messages: MessageDocument[];

	if(currentMessageId && !currentMessageDone) {
		const currentMessage: MessageDocument = await getMessageV2(currentMessageId);
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
				redirect(`/threads/${thread._id}/page/${currentMessagePage}?messageId=${currentMessageId}`);
			}

			return(
				<Suspense fallback={<Loading/>}>
					<h1>{thread.title}</h1>
					<div className="flex justify-between">
						<div className="flex space-x-1">
							<div className="flex items-center">
								<PersonIcon/>
								<span>{author.username}</span>
							</div>
							<div className="flex items-center">
								<WatchLaterIcon/>
								<span>{smartTimeConvert(thread.create_time)}</span>
							</div>
						</div>
						<EditThreadButton authorId={author._id} threadId={thread._id}/>
					</div>
					<div>
						<h2>Disscussion</h2>
						<hr/>
						<Pagination
							size={5}
							totalPage={Math.floor((thread.replies - 1) / 20) + 1}
							page={page ?? 1}
							link={`/threads/${thread._id}/page/`}
						/>
						<MessageList messages={messages}/>
						<Pagination
							size={5}
							totalPage={Math.floor((thread.replies - 1) / 20) + 1}
							page={page ?? 1}
							link={`/threads/${thread._id}/page/`}
						/>
						<ReplyThread thread_id={thread._id}/>
					</div>
				</Suspense>
			)
		}
	}
	
	[author, messages] = await Promise.all([
		getUserV2(thread.user),
		getMessagesV2(thread._id, offset ?? 0, limit ?? 20)
	]);
	
	return(
		<Suspense fallback={<Loading/>}>
			<h1>{thread.title}</h1>
			<div className="flex justify-between">
				<div className="flex space-x-1">
					<div className="flex items-center">
						<PersonIcon/>
						<span>{author.username}</span>
					</div>
					<div className="flex items-center">
						<WatchLaterIcon/>
						<span>{smartTimeConvert(thread.create_time)}</span>
					</div>
				</div>
				<EditThreadButton authorId={author._id} threadId={thread._id}/>
			</div>
			<div>
				<h2>Disscussion</h2>
				<hr/>
				<Pagination
					size={5}
					totalPage={Math.floor((thread.replies - 1) / 20) + 1}
					page={page ?? 1}
					link={`/threads/${thread._id}/page/`}
				/>
				{messages && <MessageList messages={messages}/>}
				<Pagination
					size={5}
					totalPage={Math.floor((thread.replies - 1) / 20) + 1}
					page={page ?? 1}
					link={`/threads/${thread._id}/page/`}
				/>
				<ReplyThread thread_id={thread._id}/>
			</div>
		</Suspense>
	)
}