import { Suspense } from "react"
import UserCard from "./UserCard";
import MessageBody from "./MessageBody";
import Loading from "@/app/components/layout/Loading";
import { MessageDocument } from "@/app/page";
import { getUserV2 } from "@/app/components/utils/fetch/v2/user";

export default async function Message({message}: {message: MessageDocument}) {
	const user = await getUserV2(message.user);
	return(
		<Suspense fallback={<Loading/>}>
			<div className="flex rounded bg-gray-600 my-5">
				<UserCard user={user}/>
				<MessageBody message={message}/>
			</div>
		</Suspense>
	)
}