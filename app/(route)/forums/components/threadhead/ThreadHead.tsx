import Link from "next/link";
import styles from "../forum.module.css";
import { smartTimeConvert } from "@/app/components/utils/HelperFunction";
import LastestMessage from "./LastestMessage";
import { UserAvatar } from "@/app/components/ui/Avatar/UserAvatar";
import { ThreadDocument, UserDocument } from "@/app/page";
import { getUserV2 } from "@/app/components/utils/fetch/v2/user";

export default async function ThreadHead({thread}: {thread: ThreadDocument}) {
	const threadAuthor: UserDocument = await getUserV2(thread.user);
	return(
		<Link className="flex" href={"/threads/" + thread._id}>
			<div className="flex flex-grow">
				<UserAvatar user={threadAuthor} width={36} height={36}/>
				<div className="flex-grow py-1 px-2 border-x-[1px] border-gray-400">
					<div className="flex">
						<div className="space-x-2">
							{thread.tag.map(tag => (
								<span>"{tag.name}"</span>
							))}
						</div>
						<div className="font-bold text-[1rem]">
							{thread.title}
						</div>
					</div>
					<div className="flex space-x-4 text-[0.9rem]">
						<div>
							{threadAuthor.username}
						</div>
						<div>
							{smartTimeConvert(thread.create_time)}
						</div>
					</div>
				</div>
				
				<div className={`w-[115px] py-1 px-2 ${styles.additionInfo}`}>
					<div className="flex justify-between">
						<span>Replies:</span>
						<span>{thread.replies}</span>
					</div>
					<div className="flex justify-between">
						<span>Views:</span>
						<span>{thread.views}</span>
					</div>
				</div>

				<LastestMessage thread={thread}/>
			</div>
		</Link>
	)
}