'use client'
import Loading from "@/app/components/layout/Loading";
import { MessageType, ThreadType, UserType } from "@/app/components/type";
import { GetFullThread, GetUser } from "@/app/components/utils/CustomFetch";
import { getSectionId } from "@/app/components/utils/HelperFunction";
import { useEffect, useState } from "react";
import ThreadBody from "./component/ThreadBody";
import RichTextEditor from "@/app/components/editor/RichTextEditor";



export default function Thread({params}: {params: {thread: string}}) {
	const thread_id = getSectionId(params.thread);
  const [thread, setThread] = useState<{thread: ThreadType, messages: MessageType[]} | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [done, setDone] = useState<number>(0);

  useEffect(() => {
    const fetchThread = async () => {
      const threadData = await GetFullThread(thread_id);
      if(threadData !== null) {
        setThread(threadData);
        setDone((prev) => prev + 1);
      } else {
        setThread(null);
        setDone((prev) => prev + 1);
      }
    }

    const fetchUser = async() => {
      const userSession = await GetUser();
      if(userSession !== null) {
        setUser(userSession);
        setDone((prev) => prev + 1);
      } else {
        setUser(null);
        setDone((prev) => prev + 1);
      }
    }
    
    fetchThread().catch((e) => console.log(e));
    fetchUser().catch((e) => console.log(e));
  }, []);

	return(
		<>
      {done ?
        <RichTextEditor>
          {thread !== null &&
            <ThreadBody item={thread} user={user}/>
          }
        </RichTextEditor> :
        <Loading/>
      }
    </>
	)
}