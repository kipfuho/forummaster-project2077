'use client'
import { useRichTextEditorContext } from "@/app/components/editor/EditorContext";
import RichTextEditorContent from "@/app/components/editor/RichTextEditorContent";
import { useUserContext } from "@/app/components/layout/UserContext";
import { PostFetch } from "@/app/components/utils/CustomFetch";
import { getSectionId } from "@/app/components/utils/HelperFunction";
import { usePathname } from "next/navigation";
import { useState } from "react";
import CreateIcon from '@mui/icons-material/Create';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function PostThreadBody() {
	const pathName = usePathname();
  const editor = useRichTextEditorContext();
  const forumId = getSectionId(pathName);
  const [threadTitle, setThreadTitle] = useState("");
  const [user, _] = useUserContext();

  const PostThreadClick = async () => {
    let response = await PostFetch(
      "user/create-thread",
      {
        forum_id: forumId,
        email: user?.email,
        content: editor?.getHTML(),
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
		<div>
        <h2>Post thread</h2>
        <input
          className="w-full rounded border p-2 my-5 bg-gray-700"
          placeholder="Thread title"
          value={threadTitle}
          onChange={(e) => setThreadTitle(e.currentTarget.value)}
        />
        <RichTextEditorContent editor={editor}/>
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
      </div>
	)
}