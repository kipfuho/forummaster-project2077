import Loading from "@/app/components/layout/Loading";
import { getSectionId } from "@/app/components/utils/HelperFunction";
import { Suspense } from "react";
import ThreadBody from "./component/ThreadBody";
import { getThread } from "@/app/components/utils/fetch/v1/thread";
import { getMessages } from "@/app/components/utils/fetch/v1/message";
import { getUserPublic } from "@/app/components/utils/fetch/v1/user";

export default async function Thread({params}: {params: {thread: string}}) {
  const thread_id = getSectionId(params.thread);
  const thread = await getThread(thread_id);
  const messagesData = getMessages(thread_id);
  const userData = getUserPublic(thread.user_id);
  const [messages, user] = await Promise.all([messagesData, userData]);

	return(
		<Suspense fallback={<Loading/>}>
      <ThreadBody thread={thread} messages={messages} user={user}/>
    </Suspense>
	)
}