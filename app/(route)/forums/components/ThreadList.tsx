import ThreadHead from "./threadhead/ThreadHead";
import { ThreadDocument } from "@/app/page";

export default function ThreadList({threads}: {threads: ThreadDocument[]}) {
	if(threads.length > 0) {
		return	(
			<div className="divide-y-[1px] z-50 divide-gray-400">
				{threads?.map((thread: ThreadDocument, index: number) => (
					<ThreadHead key={index} thread={thread}/>
				))}
			</div>
		)
	} else {
		return (
			<p className="p-2">No threads found!</p>
		)
	}
}