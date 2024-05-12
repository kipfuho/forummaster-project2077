import Loading from "@/app/components/layout/Loading";
import { Suspense } from "react";
import ForumPageHeader from "../../../components/ForumPageHeader";
import { ForumDocument } from "@/app/page";
import ForumBody from "../../../components/Forum";
import { getForumV2 } from "@/app/components/utils/fetch/v2/forum";

export default async function ForumPageNumber({
  params, 
  searchParams
}: {
  params: {forumId: string, pageNumber: number}, 
  searchParams?: { [key: string]: string | undefined}
}) {
  const forum: ForumDocument = await getForumV2(params.forumId);
  const filterOptions = {
    prefix: searchParams?.prefixId ? searchParams?.prefixId.split(',') : undefined,
    author: searchParams?.authorUsername,
    last_update: searchParams?.last_update ? Number.parseInt(searchParams.last_update) : undefined,
    sort_type: searchParams?.sort_type ? searchParams?.sort_type : 'update_time',
    descending: searchParams?.ascending ? false : true
  }

	return(
		<Suspense fallback={<Loading/>}>
      <ForumPageHeader forum={forum}/>
      <ForumBody forum={forum} offset={(params.pageNumber - 1)*20} page={params.pageNumber} filterOptions={filterOptions}/>
    </Suspense>
	)
}