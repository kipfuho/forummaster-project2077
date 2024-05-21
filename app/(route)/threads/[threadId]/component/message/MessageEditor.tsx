import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Button } from "@mui/material";
import { RichTextEditorRef } from "mui-tiptap";
import RichTextBox from "@/app/components/ui/Editor/Editor";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AttachmentIcon from '@mui/icons-material/Attachment';
import SaveIcon from '@mui/icons-material/Save';
import { MessageDocument } from "@/app/page";
import { updateMessageV2 } from "@/app/components/utils/fetch/v2/message";
import { uploadAttachmentsV2 } from "@/app/components/utils/fetch/v2/upload";
import Loading from "@/app/components/layout/Loading";
import ReplyAttachment from "../thread/replyBox/ReplyAttachment";

export default function MessageEditor({
	message,
	setMessage,
	setEditView
}: {
	message: MessageDocument,
	setMessage: Dispatch<SetStateAction<MessageDocument>>,
	setEditView: Dispatch<SetStateAction<boolean>>
}) {
	const rteRef = useRef<RichTextEditorRef>(null);
	const [pending, setPending] = useState(false);
	const [links, setLinks] = useState<string[] | null>(message.attachments);
	const fileInputRef = useRef<HTMLInputElement | null>(null);


	const saveClick = async () => {
		const content = rteRef.current?.editor?.getHTML();
		if(content) {
			const result = await updateMessageV2({
				messageId: message._id,
				content,
				attachments: links ?? []
			});

			if(result) {
				setMessage(result);
				setEditView(false);
			}
		} else {
			alert('Content cannot be empty!');
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

	return(
		<div className="my-5">
			<RichTextBox
				rteRef={rteRef}
				content={message.content}
			/>
			<div className="flex border p-3 justify-center space-x-5 bg-zinc-700 mt-2">
				<div className="flex">
					<Button
						variant="outlined"
						size="small"
						onClick={attachClick}
					>
						<AttachmentIcon/>
						<span>Attach files</span>
					</Button>
				</div>
				<div className="flex-grow"></div>
				<div className="flex">
					<Button
						variant="outlined"
						size="small"
						onClick={saveClick}
					>
						<SaveIcon/>
						<span>Save</span>
					</Button>
					<Button size="small">
						<VisibilityIcon/>
						<span>Preview</span>
					</Button>
				</div>
			</div>

			{pending ? 
				<Loading/> :
				<ReplyAttachment links={links} handleDelete={handleDeleteAttachment}/>
			}
			
			<form>
				<input
					className="hidden"
					title="what?"
					ref={fileInputRef} 
					type="file"
					multiple
					onChange={async (event) => {
						if(event.target.files) {
							await handleFileChange(event.target.files);
						}
	
						event.target.value = ""; // Clear the input so the same file can be re-uploaded
					}}
				/>
			</form>
		</div>
	)
}