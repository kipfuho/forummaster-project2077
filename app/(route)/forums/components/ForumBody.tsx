import { ForumType } from "@/app/components/type";
import ThreadList from "./ThreadList";
import { Suspense } from "react";
import Loading from "@/app/components/layout/Loading";
import { ForumDocument, ThreadDocument } from "@/app/page";
import { getThreadsV2 } from "@/app/components/utils/fetch/v2/thread";

export default async function ForumBody({forum}: {forum: ForumDocument}) {
	const threads: ThreadDocument[] = await getThreadsV2(forum._id);
	return(
		<Suspense fallback={<Loading/>}>
			<div className="rounded bg-gray-600">
				<div className="bg-gray-500 rounded-t p-2">
					NORMAL THREADS
				</div>
				<ThreadList threads={threads}/>
			</div>
		</Suspense>
	)
}