'use client'
import { MessageType, ThreadType } from "@/app/components/type";
import DebounceInput from "@/app/components/ui/DebouceInput";
import RichTextBox from "@/app/components/ui/Editor/Editor";
import { MessageDocument, ThreadDocument } from "@/app/page";
import { Button, ToggleButton } from "@mui/material";
import { RichTextEditorRef } from "mui-tiptap";
import { useRef, useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import { editThreadV2 } from "@/app/components/utils/fetch/v2/thread";
import { useUserContext } from "@/app/components/layout/UserContext";

// edit thread page
export default function ThreadEditBody({thread, message}: {thread: ThreadDocument, message: MessageDocument}) {
	const [user, _] = useUserContext();
	if(user) {
		const [messageSelected, setMessageSelected] = useState<boolean>(false);
		const [threadPrefix, setThreadPrefix] = useState<string>();
		const [threadTitle, setThreadTitle] = useState<string>(thread.title);
		const rteRef = useRef<RichTextEditorRef>(null);

		const saveClick = async () => {
			const res = await editThreadV2({
				threadId: thread._id,
				userId: user?._id,
				threadPrefix,
				threadTitle,
				threadContent: messageSelected ? rteRef.current?.editor?.getHTML() : null,
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
					<DebounceInput 
						handleDebounce={(value) => setThreadPrefix(value)}
						debounceTimeout={1000}
						placeholder='Prefix...'
						defaultValue=""
						sx={{marginBottom: "10px"}}
						fullWidth
					/>
					<DebounceInput 
						handleDebounce={(value) => setThreadTitle(value)}
						debounceTimeout={1000}
						placeholder='Title'
						defaultValue={thread.title}
						sx={{marginBottom: "10px"}}
						fullWidth
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
						<RichTextBox rteRef={rteRef} content={message.content}/>
					}
					<Button 
						variant="outlined" 
						size="small"
						onClick={saveClick}
						startIcon={<SaveIcon/>}
					>Save</Button>
				</div>
			</div>
		)
	}
}