'use client'
import { RefObject, useState } from "react";
import { RichTextEditorRef, RichTextReadOnly } from "mui-tiptap";
import { Button } from "@mui/material";
import { useUserContext } from "@/app/components/layout/UserContext";
import useExtensions from "@/app/components/ui/Editor/useExtension";
import MessageEditor from "./MessageEditor";
import { MessageType } from "@/app/components/type";
import { smartTimeConvert } from "@/app/components/utils/HelperFunction";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReplyIcon from '@mui/icons-material/Reply';

export default function MessageBody({message, rteRef}: {message: MessageType, rteRef: RefObject<RichTextEditorRef>}) {
	const extensions = useExtensions();
	const [user, _] = useUserContext();
	const [editView, setEditView] = useState<boolean>(false);

	const editClick = () => {
		setEditView(true);
	}

	const likeClick = async () => {
		if(user) {
			
		}
	}

	const replyClick = () => {
		if(user) {

		}
	}

	return(
		<div className="flex flex-grow flex-col p-2">
			<div className="flex justify-between">
				<span className="flex items-center">{smartTimeConvert(message.send_time)}</span>
				{user && user.id === message.user_id && !editView &&
					<Button 
						variant="outlined" 
						size="small"
						onClick={editClick}
					>Edit</Button>
				}
			</div>
			<div className="flex-grow">
				{editView ?
					<MessageEditor message={message}/> :
					<RichTextReadOnly
						extensions={extensions}
						content={message.content}
					/>
				}
			</div>
			<div>
				{message.last_update_time !== message.send_time &&
					<p className="text-right text-[0.9rem] text-gray-300">Last edited: {smartTimeConvert(message.last_update_time)}</p>
				}
				{message.reactions[0] > 0 &&
					<div className="border border-gray-500 border-l-red-700 border-l-2 py-1 px-2 bg-gray-700">
						{message.reactions[0]} Likes
					</div>
				}
			</div>
			{user &&
				<div className="text-right">
					<Button 
						size="small" 
						startIcon={<ThumbUpIcon/>}
						onClick={likeClick}
					>Like</Button>
					<Button 
						size="small" 
						startIcon={<ReplyIcon/>}
						onClick={replyClick}
					>Reply</Button>
				</div>
			}
		</div>
	)
}