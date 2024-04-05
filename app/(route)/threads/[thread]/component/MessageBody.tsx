import { Suspense, useRef, useState } from "react"
import { MessageType } from "@/app/components/type";
import { format } from "date-fns";
import UserCard from "./UserCard";
import { RichTextEditorRef, RichTextReadOnly } from "mui-tiptap";
import useExtensions from "@/app/components/ui/Editor/useExtension";
import { useUserContext } from "@/app/components/layout/UserContext";
import { Button } from "@mui/material";
import RichTextBox from "@/app/components/ui/Editor/Editor";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AttachmentIcon from '@mui/icons-material/Attachment';
import SaveIcon from '@mui/icons-material/Save';
import { EditMessageRequest } from "@/app/components/utils/fetch/message";

function MessageEditor({item}: {item: MessageType}) {
	const rteRef = useRef<RichTextEditorRef>(null);

	const saveClick = async () => {
		const result = await EditMessageRequest({
			message_id: item.id,
			content: rteRef.current?.editor?.getHTML()
		});
		if(result !== null) {
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
				content={item.content}
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

export default function MessageBody({item}: {item: MessageType}) {
	const extensions = useExtensions();
	const [user, _] = useUserContext();
	const [editView, setEditView] = useState<boolean>(false);

	const editClick = () => {
		setEditView(true);
	}

	return(
		<Suspense>
			<div className="flex rounded bg-gray-600 my-5">
				<UserCard user_mail={item.sender_email}/>
				<div className="flex flex-grow flex-col p-2">
					<div className="flex justify-between">
						<span className="flex items-center">{format(item.send_time.toLocaleString(), "MMM dd, yyyy")}</span>
						{user && user.email === item.sender_email && !editView &&
							<Button 
								variant="outlined" 
								size="small"
								onClick={editClick}
							>Edit</Button>
						}
					</div>
					<div className="flex-grow">
						{editView ?
							<MessageEditor item={item}/> :
							<RichTextReadOnly
								extensions={extensions}
								content={item.content}
							/>
						}
					</div>
					<div>
						{item.last_update_time !== null &&
							<span>{format(item.last_update_time.toLocaleString(), "MMM dd, yyyy")}</span>
						}
						<div className="border border-gray-500 border-l-red-700 border-l-2 py-1 px-2 bg-gray-700">
							?Likes
						</div>
					</div>
				</div>
			</div>
		</Suspense>
	)
}