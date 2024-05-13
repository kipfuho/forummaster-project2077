import { MessageDocument, UserDocument } from "@/app/page";
import { getUserV2 } from "@/app/components/utils/fetch/v2/user";
import UserCard from "./component/UserCard";
import MessageBody from "./MessageBody";
import { Suspense } from "react";
import Loading from "@/app/components/layout/Loading";

async function Item({message}: {message: MessageDocument}) {
	const user: UserDocument = await getUserV2(message.user);
	
	return (
		<div
			id={`message:${message._id}`}
			className="flex rounded bg-gray-600 my-5"
		>
			<UserCard user={user}/>
			<MessageBody _message={message} author={user}/>
		</div>
	)
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
				<Item key={index} message={message}/>
			))}
		</Suspense>
	)
}