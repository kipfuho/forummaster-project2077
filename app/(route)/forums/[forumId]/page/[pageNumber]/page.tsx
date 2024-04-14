import Loading from "@/app/components/layout/Loading";
import { Suspense } from "react";
import ForumPageHeader from "../../../components/ForumPageHeader";
import { ForumDocument } from "@/app/page";
import ForumBody from "../../../components/ForumBody";
import { getForumV2 } from "@/app/components/utils/fetch/v2/forum";

export default async function ForumPageNumber({params}: {params: {forumId: string, pageNumber: number}}) {
  const forum: ForumDocument = await getForumV2(params.forumId);
	return(
		<Suspense fallback={<Loading/>}>
      <ForumPageHeader forum={forum}/>
      <ForumBody forum={forum} offset={(params.pageNumber - 1)*20} page={params.pageNumber}/>
    </Suspense>
	)
}