import { Suspense } from "react"
import Loading from "@/app/components/layout/Loading";
import { MessageDocument } from "@/app/page";
import { getUserV2 } from "@/app/components/utils/fetch/v2/user";
import UserCard from "./component/UserCard";
import MessageBody from "./MessageBody";

export default async function Message({message}: {message: MessageDocument}) {
	const user = await getUserV2(message.user);
	return(
		<Suspense fallback={<Loading/>}>
			<div
				id={`message:${message._id}`}
				className="flex rounded bg-gray-600 my-5"
			>
				<UserCard user={user}/>
				<MessageBody _message={message} _user={user}/>
			</div>
		</Suspense> 
	)
}