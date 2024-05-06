'use client'
import { useEffect, useState } from "react";
import { RichTextReadOnly } from "mui-tiptap";
import { Button, Tooltip } from "@mui/material";
import { useUserContext } from "@/app/components/context/user/UserContext";
import useExtensions from "@/app/components/ui/Editor/useExtension";
import { smartTimeConvert } from "@/app/components/utils/HelperFunction";
import ReplyIcon from '@mui/icons-material/Reply';
import { MessageDocument, ReactionDocument, UserDocument } from "@/app/page";
import { reactMessageV2 } from "@/app/components/utils/fetch/v2/message";
import { useReplyContext } from "../ReplyBoxContext/replyContext";
import { grey, red } from "@mui/material/colors";
import { getReactionV2 } from "@/app/components/utils/fetch/v2/reaction";
import BookmarkButton from "./component/BookmarkButton";
import ReactionBox, { REACTION_ICON } from "./component/reaction/ReactionBox";
import ReportButton from "./component/ReportButton";
import AttachmentBox from "./component/AttachmentBox";
import ReactionHover from "./component/reaction/ReactionHover";
import dynamic from "next/dynamic";

const MessageEditor = dynamic(() => import('./MessageEditor'))

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
				<span className="text-[0.9rem] text-gray-300">{smartTimeConvert(message.create_time)}</span>
				
				{user &&
					<span>
						<BookmarkButton user={user} message={message}/>
						{ user._id === message.user && !editView &&
						<Button 
							variant="outlined" 
							onClick={editClick}
							sx={{height: '25px'}}
						>Edit</Button>
						}
					</span>
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
				<div className="flex justify-between">
					<ReportButton message={message} user={user}/>
					<div>
						<Tooltip 
							title={
								<ReactionHover
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
				</div>
			}
		</div>
	)
}