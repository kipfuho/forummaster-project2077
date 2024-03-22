import { Suspense } from "react";
import { ForumCategoryType, ForumType } from "../../../page";
import PostFetch from "../../../components/utils/PostFetch";
import CategoryBody from "./CategoryBody";
import Forum from "../../forums/components/Forum";
import Loading from "@/app/components/Loading";

export async function getForums(category: string) {
  var forums = await PostFetch("user/get-forum-category", {category: category}, null);
  return forums;
}

// Category component
// This appear in home page
export default async function Category({item}: {item: ForumCategoryType}) {
  const forumsData = getForums(item.category);
  const [forums] = await Promise.all([forumsData]);
  return(
    <CategoryBody item={item}>
      <Suspense fallback={<Loading/>}>
        <div className="divide-y-[1px]">
          {forums.map((forum: ForumType, index: number) => (
            <Forum key={index} children={forum}/>
          ))}
        </div>
      </Suspense>
    </CategoryBody>
  )
}