'use client'
import Loading from "@/app/components/layout/Loading";
import { MessageType, ThreadType } from "@/app/components/type";
import RichTextBox from "@/app/components/ui/Editor/Editor";
import { EditThreadRequest, GetThread } from "@/app/components/utils/fetch/thread";
import { getSectionId } from "@/app/components/utils/HelperFunction"
import { Button, TextField, ToggleButton } from "@mui/material";
import { RichTextEditorRef } from "mui-tiptap";
import { useEffect, useRef, useState } from "react";

type Thread = {
	thread: ThreadType;
	message: MessageType;
}

// edit thread page
export default function EditThread({params}: {params: {threadName: string}}) {
	const thread_id = getSectionId(params.threadName);
	const [threadData, setThread] = useState<Thread | null>(null);
	const [done, setDone] = useState<boolean>(false);
	const [messageSelected, setMessageSelected] = useState<boolean>(false);
	const [threadTitle, setThreadTitle] = useState<string>();
	const rteRef = useRef<RichTextEditorRef>(null);

	const saveClick = async () => {
		const fetchData = await EditThreadRequest(
			{
				thread_id,
				content: messageSelected ? rteRef.current?.editor?.getHTML() : null,
				thread_title: threadTitle,
				tag: []
			}
		);
		if(fetchData !== null) {
			alert("updated");
		} else {
			alert("failed");
		}
	}

	useEffect(() => {
		const getThread = async () => {
			const threadData = await GetThread(thread_id);
			setThread(threadData);
			if(threadData) {
				setThreadTitle(threadData.thread.thread_title);
			}
			setDone(true);
		};

		getThread().catch((e) => console.log(e));
	}, []);

	return(
		<>
			{done ?
				<div className="bg-gray-600 border">
					{threadData !== null ?
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
						</div> :
						<div>
							Error
						</div>
					}
				</div> :
				<Loading/>
			}
		</>
	)
}