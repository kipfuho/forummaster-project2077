'use client'
import { useUserContext } from "@/app/components/context/user/UserContext"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ForumDocument } from "@/app/page";

function PostThreadButton() {
  const pathname = usePathname();
  return(
    <Link className="rounded border-transparent p-1 bg-red-700" href={pathname + "/post-thread"}>
      Post thread
    </Link>
  )
}

export default function ForumPageHeader({forum}: {forum: ForumDocument}) {
	const [user, _] = useUserContext();
	return(
		<div className="flex mb-5">
			<h2 className="flex flex-grow">{forum.name}</h2>
			{user &&
				<>
					{user !== null && 
						<>{user.class >= forum.privilege.upload ?
							<PostThreadButton/> :
							<p className="rounded border border-gray-400 px-1">You don&#39;t have permission to upload here</p>
						}</>
					}
				</>
			}
		</div>
	)
}