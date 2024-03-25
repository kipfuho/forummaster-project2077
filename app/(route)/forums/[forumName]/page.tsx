'use client'
import { 
  useEffect, 
  useState 
} from "react";
import Loading from "@/app/components/layout/Loading";
import ThreadHead from "../components/ThreadHead";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Pagination from "@/app/components/ui/Pagination/Pagination";
import { getSectionId } from "@/app/components/utils/HelperFunction";
import { getThreadData } from "@/app/components/utils/CustomFetch";
import { ThreadType } from "@/app/components/type";

// Forum pages
export default function Forum({ params } : {params: {forumName:string}}){
  const pathname = usePathname();
  const [threads, setThreads] = useState<ThreadType[] | null>(null);
  const [done, setDone] = useState<boolean>(false); // see if data has been fetched
  const [page, setPage] = useState(0);

  // fetch threads for render
  useEffect(() => {
    const getForum = async () => {
      const forum_id = getSectionId(params.forumName);
      const threadsData = await getThreadData(forum_id);
      if(threadsData !== null) {
        setThreads(threadsData);
      } else {
        setThreads(null);
      }
      setDone(true);
    }

    getForum().catch((e) => console.log(e));
  }, []);

  return(
    <main>
      <div className="flex mb-5">
        <h2 className="flex flex-grow">{params.forumName}</h2>
        <Link className="rounded border-transparent p-1 bg-red-700" href={pathname
         + "/post-thread"}>
          Post thread
        </Link>
      </div>
      <Pagination count={5} page={page} onPageChange={setPage}/>
      {done ?
        <div className="rounded bg-gray-600">
          <div className="bg-gray-500 rounded-t p-2">
            NORMAL THREADS
          </div>
          <div className="divide-y-[1px] z-50">
            {threads !== null &&
              threads.map((thread: ThreadType, index: number) => (
                <ThreadHead key={index} item={thread}/>
              ))
            }
          </div>
        </div> :
        <Loading/>
      }
      <Pagination count={5} page={page} onPageChange={setPage}/>
    </main>
  )
}