'use client'
import RichTextBox from "@/app/components/ui/Editor/Editor";
import { RichTextEditorRef } from "mui-tiptap";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AttachmentIcon from '@mui/icons-material/Attachment';
import ReplyIcon from '@mui/icons-material/Reply';
import { useUserContext } from "@/app/components/context/user/UserContext";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { UserAvatar } from "@/app/components/ui/Avatar/UserAvatar";
import { ReplyThreadV2 } from "@/app/components/utils/fetch/v2/thread";
import AddAttachment from "./AddAttachment";
import { useReplyContext } from "../ReplyBoxContext/replyContext";

export default function ReplyThread({
	thread_id,
}: {
	thread_id: string,
}) {
	const [user, _1] = useUserContext();
	const [_2, setRteRef] = useReplyContext();
	const rteRef = useRef<RichTextEditorRef>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [links, setLinks] = useState<string[]>([]);

	const replyClick = async () => {
		if(user) {
			const res = await ReplyThreadV2({
				threadId: thread_id,
				userId: user._id,
				content: rteRef.current?.editor?.getHTML() ?? '',
				attachments: links ?? []
			});

			setLinks([]);
			rteRef.current?.editor?.commands.clearContent();
		}
	}

	useEffect(() => {
		if(rteRef) {
			setRteRef(rteRef);
		}
	}, [rteRef, setRteRef]);

	if(user) {
		return(
			<div className="flex rounded bg-gray-600 my-5">
				<div className="p-2 min-w-[142px] border-r-gray-500 border-r-[1px]">
					<UserAvatar user={user} size={125}/>
				</div>
				<div className="flex-grow p-2 overflow-auto">
					<RichTextBox rteRef={rteRef}/>
					<AddAttachment
						setLinks={setLinks}
						fileInputRef={fileInputRef}
					/>
					<div className="flex border p-2 mt-2 bg-zinc-700 justify-between">
						<div>
							<Button 
								variant="outlined"
								size="small"
								sx={{marginRight: "5px", textTransform: "none"}}
								startIcon={<AttachmentIcon/>}
								onClick={() => fileInputRef.current?.click()}
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
								onClick={() => console.log(rteRef.current?.editor?.getHTML())}
							>Preview</Button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}