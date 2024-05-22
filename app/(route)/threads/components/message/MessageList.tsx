import { MessageDocument, UserDocument } from "@/app/page";
import { getUserV2 } from "@/app/components/utils/fetch/v2/user";
import UserCard from "./component/UserCard";
import MessageBody from "./MessageBody";
import { Suspense } from "react";
import Loading from "@/app/components/layout/Loading";

async function Item({
	message,
	currentMessageId
}: {
	message: MessageDocument,
	currentMessageId: string | undefined
}) {
	const user: UserDocument | null = await getUserV2(message.user);
	
	if(user) {
		return (
			<div
				id={`message:${message._id}`}
				className="flex rounded bg-gray-600 my-5"
			>
				<UserCard user={user}/>
				<MessageBody
					_message={message}
					author={user}
					currentMessageId={currentMessageId}
				/>
			</div>
		)
	}
}

export default async function MessageList({
	messages,
	currentMessageId
}: {
	messages: MessageDocument[],
	currentMessageId?: string
}) {
	return (
		<Suspense fallback={<Loading/>}>
			{messages.map((message, index) => (
				<Item
					key={index}
					message={message}
					currentMessageId={currentMessageId}
				/>
			))}
		</Suspense>
	)
}