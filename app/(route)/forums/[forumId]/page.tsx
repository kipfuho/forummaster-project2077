import Loading from "@/app/components/layout/Loading";
import ForumBody from "../components/ForumBody";
import { Suspense } from "react";
import ForumPageHeader from "../components/ForumPageHeader";
import { getForumV2 } from "@/app/components/utils/fetch/v2/forum";
import { ForumDocument } from "@/app/page";

// Forum pages
export default async function Forum({ params } : {params: {forumId:string}}){
  const forum: ForumDocument = await getForumV2(params.forumId);
  return(
    <Suspense fallback={<Loading/>}>
      <ForumPageHeader forum={forum}/>
      <ForumBody forum={forum}/>
    </Suspense>
  )
}