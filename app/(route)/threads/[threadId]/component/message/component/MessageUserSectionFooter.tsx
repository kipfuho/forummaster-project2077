import { useUserContext } from "@/app/components/context/user/UserContext";
import ReportButton from "./ReportButton";
import { Button, Tooltip } from "@mui/material";
import ReactionHover from "./reaction/ReactionHover";
import { MessageDocument, ReactionDocument } from "@/app/page";
import { useReplyContext } from "../../ReplyBoxContext/replyContext";
import ReplyIcon from '@mui/icons-material/Reply';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { grey, red } from "@mui/material/colors";
import { getReactionV2 } from "@/app/components/utils/fetch/v2/reaction";
import ReactionBox, { REACTION_ICON } from "./reaction/ReactionBox";
import { reactMessageV2 } from "@/app/components/utils/fetch/v2/message";
import { smartTimeConvert } from "@/app/components/utils/HelperFunction";

export default function MessageUserSectionFooter({
	authorUsername,
	message,
	setMessage,
}: {
	authorUsername: string,
	message: MessageDocument,
	setMessage: Dispatch<SetStateAction<MessageDocument>>,
}) {
	const [user, _1] = useUserContext();
	const [replyRteRef, _2] = useReplyContext();
	const [reaction, setReaction] = useState<ReactionDocument | null>(null);
	const [openReactionBox, setOpenReactionBox] = useState<boolean>(false);

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
	}, [user, message._id]);
	
	if(user) {
		const replyClick = () => {
			if(replyRteRef) {
				const content = `<QUOTES username="${authorUsername}" messageId="${message._id}" memberId="${message.user}">${message.content}</QUOTES>`;
				replyRteRef.current?.editor?.chain().insertContentAt(0, content).focus().run();
			}
		}

		return (
			<>
				<div>
					{message.update_time !== message.create_time &&
						<p className="text-right text-[0.9rem] text-gray-300">Last edited: {smartTimeConvert(message.update_time)}</p>
					}
					<ReactionBox message={message} curReaction={reaction}/>
				</div>
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
									const result: {
										message: MessageDocument,
										reaction: ReactionDocument
									} = await reactMessageV2(message._id, user._id, reaction?.type ?? 'like');

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
			</>
		)
	}
}