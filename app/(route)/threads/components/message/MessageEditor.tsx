import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Button } from "@mui/material";
import { RichTextEditorRef } from "mui-tiptap";
import RichTextBox from "@/app/components/ui/Editor/Editor";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AttachmentIcon from '@mui/icons-material/Attachment';
import SaveIcon from '@mui/icons-material/Save';
import { MessageDocument } from "@/app/page";
import { updateMessageV2 } from "@/app/components/utils/fetch/v2/message";
import AddAttachment from "../thread/AddAttachment";

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
	const [links, setLinks] = useState<string[]>(message.attachments);
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
						onClick={() => fileInputRef.current?.click()}
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

			<AddAttachment
				fileInputRef={fileInputRef}
				setLinks={setLinks}
			/>
		</div>
	)
}