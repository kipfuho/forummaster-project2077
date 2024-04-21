'use client'
import { useEffect, useState } from "react";
import { RichTextReadOnly } from "mui-tiptap";
import { Button } from "@mui/material";
import { useUserContext } from "@/app/components/layout/UserContext";
import useExtensions from "@/app/components/ui/Editor/useExtension";
import MessageEditor from "./MessageEditor";
import { smartTimeConvert } from "@/app/components/utils/HelperFunction";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReplyIcon from '@mui/icons-material/Reply';
import { MessageDocument, UserDocument } from "@/app/page";
import { likeMessageV2 } from "@/app/components/utils/fetch/v2/message";
import Link from "next/link";
import { getFileName } from "./ReplyThread";
import { useReplyContext } from "./ReplyBoxContext/replyContext";

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

function AttachmentBox({attachments}: {attachments: string[]}) {
	if(attachments.length > 0) {
		return (
			<div className="border rounded p-2 my-2">
				<h2>Attachments</h2>
				<div className="flex flex-col">
					{attachments.map((link) => (
						<Link className="text-red-600 hover:underline hover:text-red-500" href={link} target="_blank" download="">{getFileName(link)}</Link>
					))}
				</div>
			</div>
		)
	}
}

export default function MessageBody({_message, _user}: {_message: MessageDocument, _user: UserDocument}) {
	const [message, setMessage] = useState<MessageDocument>(_message);
	const extensions = useExtensions();
	const [user, _] = useUserContext();
	const [editView, setEditView] = useState<boolean>(false);
	const replyRteRef = useReplyContext();

	const editClick = () => {
		setEditView(true);
	}

	const replyClick = () => {
		if(replyRteRef) {
			const content = `<QUOTES username="${_user.username}" messageId="${_message._id}" memberId="${_user._id}">${_message.content}</QUOTES>`
			console.log(content);
			replyRteRef.current?.editor?.chain().insertContentAt(0, content).focus().run();
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
			<AttachmentBox attachments={message.attachments}/>
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
						onClick={async () => {
							const result = await likeMessageV2(message._id, user._id);
							if(result) {
								setMessage(result);
							}
						}}
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