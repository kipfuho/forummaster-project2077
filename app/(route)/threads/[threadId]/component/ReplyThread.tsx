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
import { Button } from "@mui/material";
import { UserAvatar } from "@/app/components/ui/Avatar/UserAvatar";

export default function ReplyThread({thread_id, rteRef}: {thread_id: string, rteRef: RefObject<RichTextEditorRef>}) {
	const [user, _] = useUserContext();
	if(user) {
		const replyClick = async () => {
			const res = await replyThread({
				thread_id: thread_id,
				user_id: user._id,
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
				<div className="p-2 min-w-[142px] border-r-gray-500 border-r-[1px]">
					<UserAvatar user={user} size={125}/>
				</div>
				<div className="flex-grow p-2 overflow-auto">
					<RichTextBox rteRef={rteRef}/>
					<div className="flex border p-2 mt-2 bg-zinc-700 justify-between">
						<div>
							<Button 
								variant="outlined"
								size="small"
								sx={{marginRight: "5px", textTransform: "none"}}
								startIcon={<AttachmentIcon/>}
							>Attach files</Button>
							<Button 
								variant="outlined"
								size="small"
								sx={{marginRight: "5px", textTransform: "none"}}
								startIcon={<AttachmentIcon/>}
							>Insert Quotes</Button>
						</div>
						<div>
							<Button
								variant="contained"
								size="small"
								sx={{marginRight: "5px"}}
								startIcon={<ReplyIcon/>}
								onClick={replyClick}
							>Post reply</Button>
							<Button
								variant="outlined"
								size="small"
								sx={{marginRight: "5px"}}
								startIcon={<VisibilityIcon/>}
							>Preview</Button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}