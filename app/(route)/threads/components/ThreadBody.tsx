import Pagination from "@/app/components/ui/Pagination/Pagination";
import MessageList from "./message/MessageList";
import ReplyThread from "./thread/ReplyThread";
import { MessageDocument, ThreadDocument } from "@/app/page";

export default function ThreadBody({
	thread,
	messages,
	page,
	currentMessageId
}: {
	thread: ThreadDocument,
	messages: MessageDocument[],
	page: number,
	currentMessageId?: string
}) {
	return (
		<>
			<h2>Disscussion</h2>
			<hr/>
			<Pagination
				size={5}
				totalPage={Math.floor((thread.replies - 1) / 20) + 1}
				page={page ?? 1}
				link={`/threads/${thread._id}/page/`}
			/>
			<MessageList
				messages={messages}
				currentMessageId={currentMessageId}
			/>
			<Pagination
				size={5}
				totalPage={Math.floor((thread.replies - 1) / 20) + 1}
				page={page ?? 1}
				link={`/threads/${thread._id}/page/`}
			/>
			<ReplyThread thread_id={thread._id}/>
		</>
	)
}