'use client'
import { useEffect, useState } from "react";
import Loading from "@/app/components/layout/Loading";
import { categoryData } from "@/app/page";
import { ForumType } from "@/app/components/type";
import { GetForumData } from "@/app/components/utils/CustomFetch";
import ForumHead from "@/app/(route)/categories/components/ForumHead";

// Category pages
export default function Categories({ params } : {params : {categoryName : string}}){
  const category = categoryData[params.categoryName];
  const [forums, setForums] = useState<ForumType[] | null>(null);
  const [done, setDone] = useState<boolean>(false); // see if forums have been fetched

  useEffect(() => {
    const getForums = async () => {
      const forums = await GetForumData(category.category);
      if(forums !== null) {
        setForums(forums);
        setDone(true);
      } else {
        setForums(null);
        setDone(true);
      }
    }
    
    getForums().catch((e) => console.log(e));
  }, [])

  return(
    <div>
      <h2 className="pb-10">{category.name}</h2>
      {done ?
        <div className="rounded shadow-md bg-gray-600 divide-y divide-gray-400">
          {forums &&
            forums.map((forum: ForumType, index: number) => (
              <ForumHead key={index} item={forum}/>
            ))
          }
        </div> :
        <Loading/>  
      }
    </div>
  )
}