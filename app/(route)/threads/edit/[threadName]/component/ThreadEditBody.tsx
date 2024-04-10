'use client'
import { MessageType, ThreadType } from "@/app/components/type";
import RichTextBox from "@/app/components/ui/Editor/Editor";
import { editThread } from "@/app/components/utils/fetch/v1/thread";
import { Button, TextField, ToggleButton } from "@mui/material";
import { RichTextEditorRef } from "mui-tiptap";
import { useRef, useState } from "react";

type Thread = {
	thread: ThreadType;
	message: MessageType;
}

// edit thread page
export default function ThreadEditBody({threadData}: {threadData: Thread}) {
	const [messageSelected, setMessageSelected] = useState<boolean>(false);
	const [threadTitle, setThreadTitle] = useState<string>();
	const rteRef = useRef<RichTextEditorRef>(null);

	const saveClick = async () => {
		const res = await editThread({
			thread_id: threadData.thread.id,
			content: messageSelected ? rteRef.current?.editor?.getHTML() : null,
			thread_title: threadTitle,
			tag: []
		});

		if(res.ok) {
			alert("updated");
		} else {
			alert("failed");
		}
	}

	return(
		<div className="bg-gray-600 border">
			<div className="text-center p-6 space-y-2">
				<TextField 
					variant="outlined" 
					size="small" 
					label="Thread title" 
					value={threadTitle} 
					onChange={(e) => setThreadTitle(e.currentTarget.value)}
				/>
				<br/>
				<ToggleButton 
					size="small"
					value="check" 
					selected={messageSelected} 
					onChange={() => setMessageSelected(!messageSelected)}
				>Edit message</ToggleButton>
				<br/>
				{messageSelected &&
					<RichTextBox rteRef={rteRef} content={threadData.message.content}/>
				}
				<Button 
					variant="outlined" 
					size="small"
					onClick={saveClick}
				>Save</Button>
			</div>
		</div>
	)
}