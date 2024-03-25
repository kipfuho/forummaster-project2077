'use client'
import Image from "next/image";
import Link from "next/link";
import styles from "./forum.module.css";
import { extractNameToPath } from "@/app/components/utils/HelperFunction";
import { ThreadType } from "@/app/components/type";

export default function ThreadHead({item}: {item: ThreadType}) {
	return(
		<Link className="flex" href={"/threads/" + extractNameToPath(item.thread_title) + "." + item.id}>
			<div className="flex flex-grow">
				<div className="self-center min-w-[52px]">
					<Image className="rounded-[5rem] m-2" width={36} height={36} src="/arknights.jpg" alt="avt"/>
				</div>
				<div className="flex-grow py-1 px-2 border-x-[1px] border-gray-400">
					<div className="flex">
						<div className="space-x-2">
							{item.tag.map(tag => (
								<span>"{tag}"</span>
							))}
						</div>
						<div className="font-bold text-[1rem]">
							{item.thread_title}
						</div>
					</div>
					<div className="flex space-x-4 text-[0.9rem]">
						<div>
							{item.author_email}
						</div>
						<div>
							{item.create_time.toLocaleString()}
						</div>
					</div>
				</div>
				
				<div className={`w-[115px] py-1 px-2 ${styles.additionInfo}`}>
					<div className="flex justify-between">
						<span>Replies:</span>
						<span>{item.replies}</span>
					</div>
					<div className="flex justify-between">
						<span>Views:</span>
						<span>{item.views}</span>
					</div>
				</div>

				<div className={`w-[140px] p-1 border-l-[1px] border-gray-400 ${styles.additionInfo}`}>
					{item.last_message_id}
				</div>
				
				<div className={`self-center min-w-[52px] ${styles.additionInfo}`}>
					<Image className="rounded-[5rem] m-2" width={36} height={36} src="/arknights.jpg" alt="avt"/>
				</div>
			</div>
		</Link>
	)
}