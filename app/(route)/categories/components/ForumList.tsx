import ForumHead from "./ForumHead";
import { ForumDocument } from "@/app/page";

export default function ForumList({forums}: {forums: ForumDocument[]}) {
  return(
    <div className="divide-y-[1px] divide-gray-400">
      {forums.map((forum: ForumDocument, index: number) => (
        <ForumHead key={index} forum={forum}/>
      ))}
    </div>
  )
}