import PostFetch from "@/app/components/utils/PostFetch";
import { Suspense } from "react";
import Loading from "@/app/components/Loading";
import ThreadHead from "../components/ThreadHead";

export type ForumThreadType = {
  id: number;
  forum_id: number;
  author_email: string;
  thread_title: string;
  tag: string[];
  content: string;
  create_time: Date;
  last_update_time: Date;
  replies: number;
  views: number;
  last_message_id: number;
}

export async function getThreads(forum_id: number) {
  let forums = await PostFetch("user/get-thread-forum", {forum_id: forum_id}, null);
  return forums;
}

async function getForumId(forumName: string) {
  var forum_id = 0;
  for (var i = forumName.length - 1; i >= 0; i--) {
    var num = parseInt(forumName[i]);
    if(num < 0 || num > 9) {
      return 0;
    }
    if(forumName[i] === '.') {
      break;
    }
    forum_id = forum_id + 10**(forumName.length - 1 - i)*num;
  }
  return forum_id;
}

// Forum pages
export default async function Forum({ params } : {params: {forumName:string}}){
  var forum_id = await getForumId(params.forumName);
  const threadsData = getThreads(forum_id);
  const [threads] = await Promise.all([threadsData]);

  return(
    <main>
      <div className="flex mb-5">
        <h2 className="flex flex-grow">{forum_id}</h2>
        <a className="rounded border-transparent p-1 bg-red-700" href="/forums/site-rules-news-annoucement.2/post-thread">
          Post thread
        </a>
      </div>
      <Suspense fallback={<Loading/>}>
        <div className="rounded border p-2 bg-slate-400 space-y-3">
          {threads.map((thread: ForumThreadType, index: number) => (
            <ThreadHead key={index} item={thread}/>
          ))}
        </div>
      </Suspense>
    </main>
  )
}