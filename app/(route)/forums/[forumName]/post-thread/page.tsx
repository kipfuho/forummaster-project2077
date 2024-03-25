'use client'
import { useEffect, useId, useState } from "react";
import RichTextEditor from "@/app/components/editor/RichTextEditor";
import CreateIcon from '@mui/icons-material/Create';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { usePathname, useRouter } from "next/navigation";
import { getSectionId } from "@/app/components/utils/HelperFunction";
import { GetUser, PostFetch } from "@/app/components/utils/CustomFetch";

export default function CreateThread() {
  const pathName = usePathname();
  const editorId = useId();
  const forumId = getSectionId(pathName);
  const [threadTitle, setThreadTitle] = useState("");
  const [user, setUser] = useState<{username: string, email: string} | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      let userD = await GetUser();
      if(userD.ok) {
        const [user] = await Promise.all([userD.json()]);
        setUser(user);
        console.log(user);
      }
      else {
        router.back();
      }
    };

    fetchUser().catch((e) => console.log(e));
  }, []);

  const PostThreadClick = async () => {
    let response = await PostFetch(
      "user/create-thread",
      {
        forum_id: forumId,
        email: user?.email,
        content: document.getElementById(editorId)?.innerHTML,
        thread_title: threadTitle,
        tag: []
      },
      null
    );
    
    if(response.ok){
      alert("Created");
    }
    else{
      alert("Failed");
    }
  }

  return(
    <main>
      <h2>Post thread</h2>
      <input
        className="w-full rounded border p-2 my-5 bg-gray-700"
        placeholder="Thread title"
        value={threadTitle}
        onChange={(e) => setThreadTitle(e.currentTarget.value)}
      />
      <RichTextEditor editorId={editorId}/>
      <div className="border border-t-0">
        Options
      </div>
      <div className="flex border border-t-0 p-3 justify-center space-x-5 bg-zinc-700">
        <button 
          className="rounded bg-red-700 py-1 px-5 font-bold hover:shadow-lg"
          onClick={PostThreadClick}
        >
          <CreateIcon/>
          <span>Post thread</span>
        </button>
        <button className="rounded py-1 px-5 text-red-700 font-bold hover:bg-red-700 hover:bg-opacity-15">
          <VisibilityIcon/>
          <span>Preview</span>
        </button>
      </div>
    </main>
  )
}