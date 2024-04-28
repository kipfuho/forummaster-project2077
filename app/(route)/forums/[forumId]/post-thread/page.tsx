'use client'
import ProtectedLayout from "@/app/components/layout/ProtectedLayout";
import { useUserContext } from "@/app/components/layout/UserContext";
import { useRef, useState } from "react";
import CreateIcon from '@mui/icons-material/Create';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RichTextBox from "@/app/components/ui/Editor/Editor";
import { RichTextEditorRef } from "mui-tiptap";
import { postThreadV2 } from "@/app/components/utils/fetch/v2/thread";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import DebounceInput from "@/app/components/ui/DebouceInput";

export default function CreateThread({params}: {params: {forumId: string}}) {
  const rteRef = useRef<RichTextEditorRef>(null);
  const [threadTitle, setThreadTitle] = useState("");
  const [prefix, setPrefix] = useState("");
  const [user, _] = useUserContext();
  const router = useRouter();

  const PostThreadClick = async () => {
    if(threadTitle.trim().length === 0) {
      alert("Enter your thread title");
    }
    let res = await postThreadV2({
			forumId: params.forumId,
			userId: user?._id,
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
      <div className="rounded bg-gray-600 p-2">
        <h2>Post thread</h2>
        <DebounceInput
          handleDebounce={(value) => setPrefix(value)}
          debounceTimeout={1000}
          placeholder='Prefix...'
          sx={{marginBottom: "10px"}}
          fullWidth
        />
        <DebounceInput
          handleDebounce={(value) => setThreadTitle(value)}
          debounceTimeout={1000}
          placeholder='Thread Title'
          sx={{marginBottom: "10px"}}
          fullWidth
        />
        <Box sx={{ margin: "0 auto" }}>
          <RichTextBox rteRef={rteRef}/>
        </Box>
        <div className="flex border mt-2 divide-x-[1px]">
          <div className="min-w-[200px] text-right px-2 self-center">Options:</div>
          <div className="p-2 space-x-1">
            <Button variant="outlined" size="small">Attach files</Button>
            <Button variant="outlined" size="small">Quotes</Button>
            <Button variant="outlined" size="small">Preview</Button>
          </div>
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