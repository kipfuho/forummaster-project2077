import Image from "next/image";
import { ForumThreadType } from "../[forumName]/page";

export default function ThreadHead({item}: {item: ForumThreadType}) {
	return(
		<a className="flex border" href={"/threads/"+item.thread_title.toLowerCase() + "." + item.id}>
			<div className="self-center">
				<Image className="rounded-[5rem]" width={30} height={30} src="/arknights.jpg" alt="avt"/>
			</div>
			<div className="flex divide-x-[1px]">
				<div className="w-auto p-1">
					<div className="flex space-x-2 bg-red-800">
						<div className="space-x-2">
							{item.tag.map(tag => (
								<span>"{tag}"</span>
							))}
						</div>
						<div>
							{item.thread_title}
						</div>
					</div>
					<div className="flex space-x-4 bg-blue-800">
						<div>
							{item.author_email}
						</div>
						<div>
							{item.create_time.toLocaleString()}
						</div>
					</div>
				</div>
				<div className="p-1">
					<div>
						{item.replies} Replies
					</div>
					<div>
						{item.views} Views
					</div>
				</div>
				<div className="flex p-1">
					<div>
						{item.last_message_id}
					</div>
					<div>
						<Image className="rounded-[5rem] mr-3" width={30} height={30} src="/arknights.jpg" alt="avt"/>
					</div>
				</div>
			</div>
		</a>
	)
}