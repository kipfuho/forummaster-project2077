import { RefObject, Suspense } from "react"
import { MessageType } from "@/app/components/type";
import UserCard from "./UserCard";
import MessageBody from "./MessageBody";
import Loading from "@/app/components/layout/Loading";
import { RichTextEditorRef } from "mui-tiptap";

export default function Message({message, rteRef}: {message: MessageType, rteRef: RefObject<RichTextEditorRef>}) {
	return(
		<Suspense fallback={<Loading/>}>
			<div className="flex rounded bg-gray-600 my-5">
				<UserCard user_id={message.user_id}/>
				<MessageBody message={message} rteRef={rteRef}/>
			</div>
		</Suspense>
	)
}