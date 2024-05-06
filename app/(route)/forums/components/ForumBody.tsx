import ThreadList from "./ThreadList";
import { Suspense } from "react";
import Loading from "@/app/components/layout/Loading";
import { ForumDocument, ThreadDocument } from "@/app/page";
import { filterThreadV2, getThreadsV2 } from "@/app/components/utils/fetch/v2/thread";
import Pagination from "@/app/components/ui/Pagination/Pagination";
import ThreadListHeader from "./ThreadListHeader";

export default async function ForumBody({
	forum, 
	offset, 
	limit, 
	page,
	filterOptions
}: {
	forum: ForumDocument, 
	offset?: number, 
	limit?: number, 
	page?: number,
	filterOptions: {
		prefix: string[] | undefined,
		author: string | undefined,
		last_update: number | undefined,
		sort_type: string,
		descending: boolean
	}
}) {
	if(filterOptions.prefix || filterOptions.author || filterOptions.last_update) {
		const {count, threads} = await filterThreadV2(forum._id, offset ?? 0, limit ?? 20, filterOptions);
		const query = [
			filterOptions.prefix && "prefix=" + filterOptions.prefix.join(','),
			filterOptions.author && "author=" + filterOptions.author,
			filterOptions.last_update && "last_update=" + filterOptions.last_update,
			filterOptions.sort_type !== 'update_time' && "sort_type=" +  filterOptions.sort_type,
			filterOptions.descending === false && "ascending=1",
		].filter((item) => {return item}).join('&');

		return (
			<Suspense fallback={<Loading/>}>
				<Pagination
					size={5}
					totalPage={Math.floor((count - 1) / 20) + 1}
					page={page ?? 1}
					link={`/forums/${forum._id}/page/`}
					query={query}
				/>
				<div className="rounded bg-gray-600">
					<ThreadListHeader forum={forum}/>
					<ThreadList threads={threads}/>
				</div>
				<Pagination
					size={5}
					totalPage={Math.floor((count - 1) / 20) + 1}
					page={page ?? 1}
					link={`/forums/${forum._id}/page/`}
					query={query}
				/>
			</Suspense>
		)
	} else {
		const threads: ThreadDocument[] = await getThreadsV2(forum._id, offset ?? 0, limit ?? 20);
		return(
			<Suspense fallback={<Loading/>}>
				<Pagination size={5} totalPage={Math.floor((forum.threads - 1) / 20) + 1} page={page ?? 1} link={`/forums/${forum._id}/page/`}/>
				<div className="rounded bg-gray-600">
					<ThreadListHeader forum={forum}/>
					<ThreadList threads={threads}/>
				</div>
				<Pagination size={5} totalPage={Math.floor((forum.threads - 1) / 20) + 1} page={page ?? 1} link={`/forums/${forum._id}/page/`}/>
			</Suspense>
		)
	}
}