import Loading from "@/app/components/layout/Loading";
import { getCategoryV2 } from "@/app/components/utils/fetch/v2/category";
import { CategoryDocument, ForumDocument } from "@/app/page";
import { Suspense } from "react";
import { getForumV2 } from "@/app/components/utils/fetch/v2/forum";
import ForumList from "../../components/ForumList";

async function getForums(ids: string[]) {
  let promises: any = [];
  ids.forEach(forumId => {
    promises.push(getForumV2(forumId));
  });
  return await Promise.all(promises);
}

// Category pages
export default async function Categories({ params } : {params : {categoryId : string}}){
  const category: CategoryDocument | null = await getCategoryV2(params.categoryId);
  if(category) {
    const forums: ForumDocument[] = await getForums(category.forums);
    return(
      <Suspense fallback={<Loading/>}>
        <h2 className="pb-5">{category.title}</h2>
        <div className="rounded shadow-md bg-gray-600">
          <ForumList forums={forums}/>
        </div>
      </Suspense>
    )
  } else {
    return (
      <p>Something went wrong!</p>
    )
  }
}