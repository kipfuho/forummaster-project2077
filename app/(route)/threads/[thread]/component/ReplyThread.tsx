'use client'
import RichTextBox from "@/app/components/ui/Editor/Editor";
import { RichTextEditorRef } from "mui-tiptap";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AttachmentIcon from '@mui/icons-material/Attachment';
import ReplyIcon from '@mui/icons-material/Reply';
import Image from "next/image";
import { useUserContext } from "@/app/components/layout/UserContext";
import { RefObject } from "react";
import { replyThread } from "@/app/components/utils/fetch/v1/message";

export default function ReplyThread({thread_id, rteRef}: {thread_id: number, rteRef: RefObject<RichTextEditorRef>}) {
	const [user, _] = useUserContext();
	if(user) {
		const replyClick = async () => {
			const res = await replyThread({
				thread_id: thread_id,
				user_id: user.id,
				content: rteRef.current?.editor?.getHTML()
			});

			if(res.ok) {
				alert("Replied!");
				location.reload();
			} else{
				alert("Error!");
			}
		}

		return(
			<div className="flex rounded bg-gray-600 my-5">
				<div className="min-w-[142px] text-center p-2 border-r-gray-500 border-r-[1px]" about="author">
					<Image className="rounded-[10rem] p-2" width={125} height={125} src="/arknights.jpg" alt="img"/>
				</div>
				<div className="flex-grow p-2 overflow-auto">
					<RichTextBox rteRef={rteRef}/>
					<div className="flex border p-3 justify-center space-x-5 bg-zinc-700 mt-2">
						<div className="flex">
							<button 
								className="flex items-center rounded border border-gray-600 hover:shadow-lg py-1 px-3 text-sm text-red-700"
							>
								<AttachmentIcon/>
								<span>Attach files</span>
							</button>
						</div>
						<div className="flex-grow"></div>
						<div className="flex">
							<button 
								className="flex items-center rounded bg-red-700 py-1 px-5 font-bold hover:shadow-lg text-sm"
								onClick={replyClick}
							>
								<ReplyIcon/>
								<span>POST REPLY</span>
							</button>
							<button className="flex items-center rounded py-1 px-5 text-red-700 font-bold hover:bg-red-700 hover:bg-opacity-15 text-sm">
								<VisibilityIcon/>
								<span>PREVIEW</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}