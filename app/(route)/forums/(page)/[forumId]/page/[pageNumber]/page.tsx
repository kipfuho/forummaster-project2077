import Loading from "@/app/components/layout/Loading";
import { Suspense } from "react";
import { ForumDocument } from "@/app/page";
import { getForumV2 } from "@/app/components/utils/fetch/v2/forum";
import ForumPageHeader from "@/app/(route)/forums/components/ForumPageHeader";
import ForumBody from "@/app/(route)/forums/components/ForumBody";
import Forum from "@/app/(route)/forums/components/Forum";

export default async function ForumPageNumber({
  params, 
  searchParams
}: {
  params: {forumId: string, pageNumber: number}, 
  searchParams?: { [key: string]: string | undefined}
}) {
  const forum: ForumDocument | null = await getForumV2(params.forumId);
  const filterOptions = {
    prefix: searchParams?.prefixId ? searchParams?.prefixId.split(',').map((id) => Number(id)) : undefined,
    author: searchParams?.authorUsername,
    last_update: searchParams?.last_update ? Number.parseInt(searchParams.last_update) : undefined,
    sort_type: searchParams?.sort_type ? searchParams?.sort_type : 'update_time',
    descending: searchParams?.ascending ? false : true
  }

	if(forum) {
    return(
      <Suspense fallback={<Loading/>}>
        <ForumPageHeader forum={forum}/>
        <Forum
          forum={forum}
          offset={(params.pageNumber - 1)*20}
          page={params.pageNumber}
          filterOptions={filterOptions}
        />
      </Suspense>
    )
  } else {
    return (
      <p>Something went wrong!</p>
    )
  }
}