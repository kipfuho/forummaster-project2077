'use client'
import { 
  Suspense,
  useEffect, 
  useState 
} from "react";
import Loading from "@/app/components/layout/Loading";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getSectionId } from "@/app/components/utils/HelperFunction";
import { getSingleForum } from "@/app/components/utils/CustomFetch";
import { ForumType } from "@/app/components/type";
import { useUserContext } from "@/app/components/layout/UserContext";
import ForumBody from "../components/ForumBody";

function PostThreadButton() {
  const pathname = usePathname();
  return(
    <Link className="rounded border-transparent p-1 bg-red-700" href={pathname + "/post-thread"}>
      Post thread
    </Link>
  )
}

// Forum pages
export default function Forum({ params } : {params: {forumName:string}}){
  const forum_id = getSectionId(params.forumName);
  const [user, _] = useUserContext();
  const [forum, setForum] = useState<ForumType | null>(null);

  // fetch threads for render
  useEffect(() => {
    const getForum = async () => {
      const forumData = await getSingleForum(forum_id);
      setForum(forumData);
    }

    getForum().catch((e) => console.log(e));
  }, []);

  return(
    <>
      {forum !== null ?
        <div>
          <div className="flex mb-5">
            <h2 className="flex flex-grow">{forum?.forum_name}</h2>
            { user &&
              <>
                {user !== null &&
                  <PostThreadButton/>
                }
              </>
            }
          </div>
          <Suspense fallback={<Loading/>}>
            <ForumBody forum={forum}/>
          </Suspense>
        </div> :
        <Loading/>
      }
    </>
  )
}