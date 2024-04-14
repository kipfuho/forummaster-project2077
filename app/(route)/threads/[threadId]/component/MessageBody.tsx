'use client'
import { useState } from "react";
import { RichTextReadOnly } from "mui-tiptap";
import { Button } from "@mui/material";
import { useUserContext } from "@/app/components/layout/UserContext";
import useExtensions from "@/app/components/ui/Editor/useExtension";
import MessageEditor from "./MessageEditor";
import { smartTimeConvert } from "@/app/components/utils/HelperFunction";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReplyIcon from '@mui/icons-material/Reply';
import { MessageDocument } from "@/app/page";

type Reactions = {
	like: string[];
	love: string[];
	care: string[];
	haha: string[];
	wow: string[];
	sad: string[];
	angry: string[];
}

function ReactionBox({reactions}: {reactions: Reactions}) {
	const totalReactions: number = reactions.like.length + reactions.love.length + reactions.care.length + reactions.haha.length + reactions.wow.length + reactions.sad.length + reactions.angry.length;
	if(totalReactions > 0) {
		return (
			<div className="border border-gray-500 border-l-red-700 border-l-2 py-1 px-2 bg-gray-700">
				{totalReactions} Likes
			</div>
		)
	}
}

export default function MessageBody({message}: {message: MessageDocument}) {
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
				<span className="flex items-center">{smartTimeConvert(message.create_time)}</span>
				{user && user._id === message.user && !editView &&
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
				{message.update_time !== message.create_time &&
					<p className="text-right text-[0.9rem] text-gray-300">Last edited: {smartTimeConvert(message.update_time)}</p>
				}
				<ReactionBox reactions={message.reactions}/>
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