'use client'
import RichTextBox from "@/app/components/ui/Editor/Editor";
import { RichTextEditorRef } from "mui-tiptap";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AttachmentIcon from '@mui/icons-material/Attachment';
import ReplyIcon from '@mui/icons-material/Reply';
import { useUserContext } from "@/app/components/context/user/UserContext";
import { useEffect, useRef, useState } from "react";
import { Button, Snackbar } from "@mui/material";
import { UserAvatar } from "@/app/components/ui/Avatar/UserAvatar";
import { uploadAttachmentsV2 } from "@/app/components/utils/fetch/v2/upload";
import Loading from "@/app/components/layout/Loading";
import { ReplyThreadV2 } from "@/app/components/utils/fetch/v2/thread";
import { useReplyContext } from "../../ReplyBoxContext/replyContext";
import ReplyAttachment from "./ReplyAttachment";

export default function ReplyThread({
	thread_id,
}: {
	thread_id: string,
}) {
	const [user, _1] = useUserContext();
	const rteRef = useRef<RichTextEditorRef>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [_2, setRteRef] = useReplyContext();

	const [pending, setPending] = useState(false);
	const [links, setLinks] = useState<string[] | null>(null);

	const [open, setOpen] = useState<boolean>(false);
	const [state, setState] = useState<any>(null);

	const handleClose = () => {
		setOpen(false);
	};

	const replyClick = async () => {
		if(user) {
			const res = await ReplyThreadV2(thread_id, user._id, rteRef.current?.editor?.getHTML(), links ?? []);

			setState(res);
			setOpen(true);
			setLinks(null);
			rteRef.current?.editor?.commands.clearContent();
		}
	}

	const attachClick = () => {
		fileInputRef.current?.click();
	}

	const handleFileChange = async (files: FileList) => {
		setPending(true);
		const result: {message: string, link: string[]} = await uploadAttachmentsV2(Array.from(files));
		if(links !== null) {
			const updatedLinks = [...links, ...result.link];
			setLinks(updatedLinks);
		} else {
			setLinks(result.link);
		}
		setPending(false);
	}

	const handleDeleteAttachment = (link: string) => {
		if(links) {
			const updatedLinks = links.filter((val, _) => val !== link);
			if(updatedLinks?.length > 0) {
				setLinks(updatedLinks);
			} else {
				setLinks(null);
			}
		} else {
			return;
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
					{pending ? 
						<Loading/> :
						<ReplyAttachment links={links} handleDelete={handleDeleteAttachment}/>
					}
					<div className="flex border p-2 mt-2 bg-zinc-700 justify-between">
						<div>
							<Button 
								variant="outlined"
								size="small"
								sx={{marginRight: "5px", textTransform: "none"}}
								startIcon={<AttachmentIcon/>}
								onClick={attachClick}
								disabled={pending}
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
					<form>
						<input 
							ref={fileInputRef} 
							type="file"
							multiple
							onChange={async (event) => {
								if(event.target.files) {
									await handleFileChange(event.target.files);
								}
			
								event.target.value = ""; // Clear the input so the same file can be re-uploaded
							}}
							style={{display: "none"}}
						/>
					</form>
				</div>
				<Snackbar
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					autoHideDuration={4000}
					open={open}
					onClose={handleClose}
					message={state && state.message}
				/>
			</div>
		)
	}
}