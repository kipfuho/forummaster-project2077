import Loading from "@/app/components/layout/Loading";
import { Suspense } from "react";
import { getForumV2 } from "@/app/components/utils/fetch/v2/forum";
import { ForumDocument } from "@/app/page";
import ForumPageHeader from "../../components/ForumPageHeader";
import Forum from "../../components/Forum";

// Forum pages
export default async function ForumPage({
  params,
  searchParams
} : {
  params: {forumId:string},
  searchParams?: {[key: string]: string | undefined}
}){
  const forum: ForumDocument | null = await getForumV2(params.forumId);
  const filterOptions = {
    prefix: searchParams?.prefixId ? searchParams?.prefixId.split(',').map((id) => Number(id)) : undefined,
    author: searchParams?.authorUsername,
    last_update: searchParams?.last_update ? Number.parseInt(searchParams.last_update) : undefined,
    sort_type: searchParams?.sort_type ? searchParams.sort_type : 'update_time',
    descending: searchParams?.ascending ? false : true
  }

  console.log(filterOptions);

  if(forum) {
    return(
      <Suspense fallback={<Loading/>}>
        <ForumPageHeader forum={forum}/>
        <Forum forum={forum} filterOptions={filterOptions}/>
      </Suspense>
    )
  } else {
    return (
      <p>Something went wrong!</p>
    )
  }
}