'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RichTextReadOnly } from "mui-tiptap";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useUserContext } from "@/app/components/layout/UserContext";
import useExtensions from "@/app/components/ui/Editor/useExtension";
import MessageEditor from "./MessageEditor";
import { smartTimeConvert } from "@/app/components/utils/HelperFunction";
import ReplyIcon from '@mui/icons-material/Reply';
import { MessageDocument, ReactionDocument, UserDocument } from "@/app/page";
import { reactMessageV2 } from "@/app/components/utils/fetch/v2/message";
import Link from "next/link";
import { getFileName } from "./ReplyThread";
import { useReplyContext } from "./ReplyBoxContext/replyContext";
import { useImageModalContext } from "./ImageModalContext/imageModalContext";
import { grey, red } from "@mui/material/colors";
import { getReactionsOfMessageV2, getReactionV2 } from "@/app/components/utils/fetch/v2/reaction";

const REACTION_ICON: Record<string, string> = {
	'like': '👍',
	'love': '❤️',
	'care': '🥰',
	'haha': '😂',
	'wow': '😯',
	'sad': '😢',
	'angry': '😡'
}

type Reactions = {
	like: number;
	love: number;
	care: number;
	haha: number;
	wow: number;
	sad: number;
	angry: number;
}

function ReactionBox({message, curReaction}: {message: MessageDocument, curReaction: ReactionDocument | null}) {
	const [reactions, setReactions] = useState<Array<{reaction: ReactionDocument, user: UserDocument}>>([]);
	const totalReactions: number = message.reactions.like + message.reactions.love + message.reactions.care + message.reactions.haha + message.reactions.wow + message.reactions.sad + message.reactions.angry;

	const reactUserString = (curUserReaction: ReactionDocument | null, someReactions: Array<{reaction: ReactionDocument, user: UserDocument}>, totalReactions: number): string => {
		let reactedUser = "", count = 0;
		if(curUserReaction) {
			reactedUser += 'You';
			totalReactions--;
			count++;
		}
		if(curUserReaction) {
			someReactions.forEach((item) => {
				if(count === 3) {
					return;
				}
				if(item.user._id !== curUserReaction.user) {
					reactedUser += `, ${item.user.username}`;
					totalReactions--;
					count++;
				}
			})
		} else {
			someReactions.forEach((item) => {
				if(count === 3) {
					return;
				}
				reactedUser += `, ${item.user.username}`;
				totalReactions--;
				count++
			})
		}
		if((totalReactions - count) > 0) {
			reactedUser += ` and ${totalReactions} more people`
		}
		return reactedUser;
	}

	useEffect(() => {
		const getSomeReactions = async () => {
			const reactions = await getReactionsOfMessageV2(message._id, null, 3);
			if(reactions) {
				setReactions(reactions);
			}
		}

		getSomeReactions().catch((e) => console.log(e));
	}, [curReaction]);
	
	if(totalReactions > 0) {
		return (
			<div className="text-[0.9rem] border border-gray-500 border-l-red-700 border-l-2 py-1 px-2 bg-gray-700">
				{totalReactions &&
					<ul className="inline-block list-none">
						{message.reactions.like > 0 && <li className="inline-block relative rounded-xl bg-gray-700 ml-[-5px] z-[7]">{REACTION_ICON['like']}</li>}
						{message.reactions.love > 0 && <li className="inline-block relative rounded-xl bg-gray-700 ml-[-5px] z-[6]">{REACTION_ICON['love']}</li>}
						{message.reactions.care > 0 && <li className="inline-block relative rounded-xl bg-gray-700 ml-[-5px] z-[5]">{REACTION_ICON['care']}</li>}
						{message.reactions.haha > 0 &&<li className="inline-block relative rounded-xl bg-gray-700 ml-[-5px] z-[4]">{REACTION_ICON['haha']}</li>}
						{message.reactions.wow > 0 && <li className="inline-block relative rounded-xl bg-gray-700 ml-[-5px] z-[3]">{REACTION_ICON['wow']}</li>}
						{message.reactions.sad > 0 && <li className="inline-block relative rounded-xl bg-gray-700 ml-[-5px] z-[2]">{REACTION_ICON['sad']}</li>}
						{message.reactions.angry > 0 && <li className="inline-block relative rounded-xl bg-gray-700 ml-[-5px] z-[1]">{REACTION_ICON['angry']}</li>}
					</ul>
				}
				<span>
					<span>{reactUserString(curReaction, reactions, totalReactions)}</span>
					<span> reacted to this message</span>	
				</span>
			</div>
		)
	}
}

function ReactionHoverBox({messageId, userId, setMessage, setReaction, setOpenReactionBox}: {messageId: string, userId: string, setMessage: Dispatch<SetStateAction<MessageDocument>>, setReaction: Dispatch<SetStateAction<ReactionDocument | null>>, setOpenReactionBox: Dispatch<SetStateAction<boolean>>}) {
	return (
		<div>
			<Tooltip title='Like'>
				<IconButton
					onClick={async () => {
						const result: {message: MessageDocument, reaction: ReactionDocument} = await reactMessageV2(messageId, userId);
						if(result) {
							setMessage(result.message);
							setReaction(result.reaction);
						}
						setOpenReactionBox(false);
					}}
				>👍</IconButton>
			</Tooltip>
			<Tooltip title='Love'>
				<IconButton
					onClick={async () => {
						const result: {message: MessageDocument, reaction: ReactionDocument} = await reactMessageV2(messageId, userId, 'love');
						if(result) {
							setMessage(result.message);
							setReaction(result.reaction);
						}
						setOpenReactionBox(false);
					}}
				>❤️</IconButton>
			</Tooltip>
			<Tooltip title='Care'>
				<IconButton
					onClick={async () => {
						const result: {message: MessageDocument, reaction: ReactionDocument} = await reactMessageV2(messageId, userId, 'care');
						if(result) {
							setMessage(result.message);
							setReaction(result.reaction);
						}
						setOpenReactionBox(false);
					}}
				>🥰</IconButton>
			</Tooltip>
			<Tooltip title='Haha'>
				<IconButton
					onClick={async () => {
						const result: {message: MessageDocument, reaction: ReactionDocument} = await reactMessageV2(messageId, userId, 'haha');
						if(result) {
							setMessage(result.message);
							setReaction(result.reaction);
						}
						setOpenReactionBox(false);
					}}
				>😂</IconButton>
			</Tooltip>
			<Tooltip title='Wow'>
				<IconButton
					onClick={async () => {
						const result: {message: MessageDocument, reaction: ReactionDocument} = await reactMessageV2(messageId, userId, 'wow');
						if(result) {
							setMessage(result.message);
							setReaction(result.reaction);
						}
						setOpenReactionBox(false);
					}}
				>😯</IconButton>
			</Tooltip>
			<Tooltip title='Sad'>
				<IconButton
					onClick={async () => {
						const result: {message: MessageDocument, reaction: ReactionDocument} = await reactMessageV2(messageId, userId, 'sad');
						if(result) {
							setMessage(result.message);
							setReaction(result.reaction);
						}
						setOpenReactionBox(false);
					}}
				>😢</IconButton>
			</Tooltip>
			<Tooltip title='Angry'>
				<IconButton
					onClick={async () => {
						const result: {message: MessageDocument, reaction: ReactionDocument} = await reactMessageV2(messageId, userId, 'angry');
						if(result) {
							setMessage(result.message);
							setReaction(result.reaction);
						}
						setOpenReactionBox(false);
					}}
				>😡</IconButton>
			</Tooltip>
		</div>
	)
}

function AttachmentBox({attachments}: {attachments: string[]}) {
	if(attachments.length > 0) {
		const [_, setImage, _1, setOpen] = useImageModalContext();

		const attachmentClick = (imageUrl: string) => {
			setImage(imageUrl);
			setOpen(true);
		}

		return (
			<div className="border rounded p-2 my-2">
				<h2>Attachments</h2>
				<div className="flex flex-col">
					{attachments.map((link) => (
						<p className="text-red-600 hover:underline hover:text-red-500" onClick={() => attachmentClick(link)}>{getFileName(link)}</p>
					))}
				</div>
			</div>
		)
	}
}

export default function MessageBody({_message, _user}: {_message: MessageDocument, _user: UserDocument}) {
	const [message, setMessage] = useState<MessageDocument>(_message);
	const [reaction, setReaction] = useState<ReactionDocument | null>(null);
	const [openReactionBox, setOpenReactionBox] = useState<boolean>(false);
	const extensions = useExtensions();
	const [user, _] = useUserContext();
	const [editView, setEditView] = useState<boolean>(false);
	const replyRteRef = useReplyContext();

	const editClick = () => {
		setEditView(true);
	}

	const replyClick = () => {
		if(replyRteRef) {
			const content = `<QUOTES username="${_user.username}" messageId="${_message._id}" memberId="${_user._id}">${_message.content}</QUOTES>`;
			replyRteRef.current?.editor?.chain().insertContentAt(0, content).focus().run();
		}
	}

	useEffect(() => {
		if(user) {
			const getReaction = async () => {
				const reaction = await getReactionV2(user._id, message._id);
				if(reaction) {
					setReaction(reaction);
				}
			}

			getReaction().catch((e) => console.log(e));
		}
	}, [user]);

	return(
		<div className="flex flex-grow flex-col p-2">
			<div className="flex justify-between">
				<span className="flex items-center">{smartTimeConvert(message.create_time)}</span>
				{user && user._id === message.user && !editView &&
					<Button 
						variant="outlined" 
						onClick={editClick}
						sx={{height: '25px'}}
					>Edit</Button>
				}
			</div>
			<div className="flex-grow mt-1">
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
				<ReactionBox message={message} curReaction={reaction}/>
			</div>
			{user &&
				<div className="text-right">
					<Tooltip 
						title={
							<ReactionHoverBox 
								messageId={message._id} 
								userId={user._id} 
								setMessage={setMessage} 
								setReaction={setReaction}
								setOpenReactionBox={setOpenReactionBox}
							/>
						} 
						componentsProps={{tooltip: {
							sx: {
								maxWidth: 'none',
							}
						}}}
						placement="top"
						open={openReactionBox}
						onOpen={() => setOpenReactionBox(true)}
						onClose={() => setOpenReactionBox(false)}
					>
						<Button 
							size="small" 
							startIcon={reaction ? REACTION_ICON[reaction.type] : REACTION_ICON['like']}
							sx={{color: reaction ? red[500] : grey[200]}}
							onClick={async () => {
								const result: {message: MessageDocument, reaction: ReactionDocument} = await reactMessageV2(message._id, user._id, reaction?.type ?? 'like');
								if(result) {
									setMessage(result.message);
									setReaction(result.reaction);
								}
							}}
						>
							{reaction ? reaction.type : 'Like'}
						</Button>
					</Tooltip>
					<Button 
						size="small" 
						startIcon={<ReplyIcon/>}
						sx={{color: grey[200]}}
						onClick={replyClick}
					>Reply</Button>
				</div>
			}
		</div>
	)
}