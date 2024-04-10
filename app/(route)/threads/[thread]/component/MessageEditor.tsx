'use client'
import { useRef } from "react";
import { MessageType } from "@/app/components/type";
import { Button } from "@mui/material";
import { RichTextEditorRef } from "mui-tiptap";
import RichTextBox from "@/app/components/ui/Editor/Editor";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AttachmentIcon from '@mui/icons-material/Attachment';
import SaveIcon from '@mui/icons-material/Save';

export default function MessageEditor({message}: {message: MessageType}) {
	const rteRef = useRef<RichTextEditorRef>(null);

	const saveClick = async () => {
		const res = await fetch("https://localhost:3001/message/update-message", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				message_id: message.id,
				content: rteRef.current?.editor?.getHTML()
			}),
			credentials: "include"
		});

		if(res.ok) {
			alert("updated");
			location.reload();
		} else {
			alert("failed");
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
					<Button variant="outlined" size="small">
						<AttachmentIcon/>
						<span>Attach files</span>
					</Button>
				</div>
				<div className="flex-grow"></div>
				<div className="flex">
					<Button variant="outlined" size="small" onClick={saveClick}>
						<SaveIcon/>
						<span>Save</span>
					</Button>
					<Button size="small">
						<VisibilityIcon/>
						<span>Preview</span>
					</Button>
				</div>
			</div>
		</div>
	)
}