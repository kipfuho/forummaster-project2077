import Forum from "@/app/(route)/forums/components/Forum";
import { ForumCategories, ForumType } from "@/app/page";
import { Suspense } from "react";
import { getForums } from "../components/Category";
import Loading from "@/app/components/Loading";

// Category pages
export default async function Categories({ params } : {params : {categoryName : string}}){
  const category = ForumCategories[params.categoryName];
  const forumsData = getForums(category.category);
  const [forums] = await Promise.all([forumsData]);

  return(
    <main>
      <h2 className="pb-10">{category.name}</h2>
      <Suspense fallback={<Loading/>}>
        <div className="rounded shadow-md bg-gray-600 divide-y divide-gray-400">
          {forums.map((forum: ForumType, index: number) => (
            <Forum key={index} children={forum}/>
          ))}
        </div>
      </Suspense>
    </main>
  )
}