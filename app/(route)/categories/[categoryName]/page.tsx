import { Forum } from "@/app/components/Forum";
import { ForumCategories } from "@/app/page";
import { Suspense } from "react";

// Category pages
export default function Categories({ params } : {params : {categoryName : string}}){
  const category = ForumCategories[params.categoryName];

  return(
    <main>
      <h2 className="pb-10">{category.name}</h2>
      <Suspense fallback={"Loading..."}>
        <div className="rounded shadow-md bg-gray-600 divide-y divide-gray-400">
          {category.forums.map((forum, index) => (
            <Forum key={index} children={forum}/>
          ))}
        </div>
      </Suspense>
    </main>
  )
}