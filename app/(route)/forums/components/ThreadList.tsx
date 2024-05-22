import { ThreadDocument, UserDocument } from "@/app/page";
import { getUserV2 } from "@/app/components/utils/fetch/v2/user";
import ThreadTitle from "./threadHead/ThreadTitle";
import ThreadMetadata from "./threadHead/ThreadMetadata";
import { UserAvatar } from "@/app/components/ui/Avatar/UserAvatar";
import Link from "next/link";
import LastestMessage from "./threadHead/LastestMessage";

async function Item({thread}: {thread: ThreadDocument}) {
	const threadAuthor: UserDocument | null = await getUserV2(thread.user);
	
	if(threadAuthor) {
		return (
			<Link className="flex" href={"/threads/" + thread._id}>
				<div className="flex flex-grow">
					<div className="px-1 self-center">
						<UserAvatar user={threadAuthor} size={36}/>
					</div>
					<ThreadTitle thread={thread} author={threadAuthor}/>
					<ThreadMetadata thread={thread}/>
					<LastestMessage thread={thread}/>
				</div>
			</Link>
		)
	} else {
		return (
			<p>Something went wrong!</p>
		)
	}
}

export default function ThreadList({
	threads
}: {
	threads: ThreadDocument[]
}) {
	return (
		<>
			{threads ?
				<div className="divide-y-[1px] z-50 divide-gray-400">
					{threads?.map((thread: ThreadDocument, index: number) => (
						<Item key={index} thread={thread}/>
					))}
				</div> :
				<p className="p-2">No threads found!</p>
			}
		</>
	)
}