import ThreadList from "./ThreadList";
import { Suspense } from "react";
import Loading from "@/app/components/layout/Loading";
import { ForumDocument, ThreadDocument } from "@/app/page";
import { getThreadsV2 } from "@/app/components/utils/fetch/v2/thread";
import Pagination from "@/app/components/ui/Pagination/Pagination";

export default async function ForumBody({forum, offset, limit, page}: {forum: ForumDocument, offset?: number, limit?: number, page?: number}) {
	const threads: ThreadDocument[] = await getThreadsV2(forum._id, offset ?? 0, limit ?? 20);
	return(
		<Suspense fallback={<Loading/>}>
			<Pagination size={5} totalPage={Math.floor((forum.threads - 1) / 20) + 1} page={page ?? 1} link={`/forums/${forum._id}/page/`}/>
			<div className="rounded bg-gray-600">
				<div className="bg-gray-500 rounded-t p-2">
					NORMAL THREADS
				</div>
				<ThreadList threads={threads}/>
			</div>
			<Pagination size={5} totalPage={Math.floor((forum.threads - 1) / 20) + 1} page={page ?? 1} link={`/forums/${forum._id}/page/`}/>
		</Suspense>
	)
}