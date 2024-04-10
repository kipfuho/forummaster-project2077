'use client'
import ProtectedLayout from "@/app/components/layout/ProtectedLayout";
import { useUserContext } from "@/app/components/layout/UserContext";
import { useRef, useState } from "react";
import CreateIcon from '@mui/icons-material/Create';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RichTextBox from "@/app/components/ui/Editor/Editor";
import { RichTextEditorRef } from "mui-tiptap";
import { postThreadV2 } from "@/app/components/utils/fetch/v2/thread";

export default function CreateThread({params}: {params: {forumId: string}}) {
  const rteRef = useRef<RichTextEditorRef>(null);
  const [threadTitle, setThreadTitle] = useState("");
  const [user, _] = useUserContext();

  const PostThreadClick = async () => {
    if(threadTitle.trim().length === 0) {
      alert("Enter your thread title");
    }
    let res = await postThreadV2({
			forumId: params.forumId,
			userId: user?.id,
			threadTitle: threadTitle,
			threadContent: rteRef.current?.editor?.getHTML(),
			tag: []
		});
    
    if(res.ok){
      alert("Created");
    }
    else{
      alert("Failed");
    }
  }

  return(
    <ProtectedLayout>
      <div>
        <h2>Post thread</h2>
        <input
          className="w-full rounded border p-2 my-5 bg-gray-700"
          placeholder="Thread title"
          value={threadTitle}
          onChange={(e) => setThreadTitle(e.currentTarget.value)}
        />
        <div className="rounded bg-gray-800">
          <RichTextBox rteRef={rteRef}/>
        </div>
        <div className="border mt-2">
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
    </ProtectedLayout>
  )
}