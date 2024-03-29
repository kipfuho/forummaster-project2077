import { ForumType, ThreadType } from "@/app/components/type";
import Pagination from "@/app/components/ui/Pagination/Pagination";
import { Suspense, useEffect, useState } from "react";
import ThreadHead from "./ThreadHead";
import Loading from "@/app/components/layout/Loading";
import { GetThreadData } from "@/app/components/utils/CustomFetch";

export default function ForumBody({
	forum}: {forum: ForumType}
) {
	const [threads, setThreads] = useState<ThreadType[] | null>(null);
  const [done, setDone] = useState<boolean>(false); // see if data has been fetched

	// fetch threads for render
  useEffect(() => {
    const getThreads = async () => {
      const threadsData = await GetThreadData(forum.id);
      setThreads(threadsData);
      setDone(true);
    }

    getThreads().catch((e) => console.log(e));
  }, []);

	const itemsPerPage = 10;
	let [page, setPage] = useState(0);
	let indexOfFirstItem = page * itemsPerPage;
  let indexOfLastItem = indexOfFirstItem + itemsPerPage;
  let currentItems = threads?.slice(indexOfFirstItem, indexOfLastItem);
	
	return(
		<>
			<Pagination size={5} totalPage={forum.threads / itemsPerPage} page={page} onPageChange={setPage}/>
			<div className="rounded bg-gray-600">
				<div className="bg-gray-500 rounded-t p-2">
					NORMAL THREADS
				</div>
				{done ?
					<div className="divide-y-[1px] z-50 divide-gray-400">
						{currentItems?.map((thread: ThreadType, index: number) => (
							<ThreadHead key={index} item={thread}/>
						))}
					</div> :
					<Loading/>
				}
			</div>
			<Pagination size={5} totalPage={forum.threads / itemsPerPage} page={page} onPageChange={setPage}/>
		</>
	)
}