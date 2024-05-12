import Loading from "@/app/components/layout/Loading";
import ForumBody from "../components/Forum";
import { Suspense } from "react";
import ForumPageHeader from "../components/ForumPageHeader";
import { getForumV2 } from "@/app/components/utils/fetch/v2/forum";
import { ForumDocument } from "@/app/page";

// Forum pages
export default async function Forum({
  params,
  searchParams
} : {
  params: {forumId:string},
  searchParams?: {[key: string]: string | undefined}
}){
  const forum: ForumDocument = await getForumV2(params.forumId);
  const filterOptions = {
    prefix: searchParams?.prefixId ? searchParams?.prefixId.split(',') : undefined,
    author: searchParams?.authorUsername,
    last_update: searchParams?.last_update ? Number.parseInt(searchParams.last_update) : undefined,
    sort_type: searchParams?.sort_type ? searchParams.sort_type : 'update_time',
    descending: searchParams?.ascending ? false : true
  }

  return(
    <Suspense fallback={<Loading/>}>
      <ForumPageHeader forum={forum}/>
      <ForumBody forum={forum} filterOptions={filterOptions}/>
    </Suspense>
  )
}