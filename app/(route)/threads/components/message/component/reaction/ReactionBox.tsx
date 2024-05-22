'use client'
import { getReactionsOfMessageV2 } from "@/app/components/utils/fetch/v2/reaction";
import { MessageDocument, ReactionDocument, UserDocument } from "@/app/page";
import { useEffect, useState } from "react";

export const REACTION_ICON: Record<string, string> = {
	'like': '👍',
	'love': '❤️',
	'care': '🥰',
	'haha': '😂',
	'wow': '😯',
	'sad': '😢',
	'angry': '😡'
}

export default function ReactionBox({message, curReaction}: {message: MessageDocument, curReaction: ReactionDocument | null}) {
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
	}, [curReaction, message._id]);
	
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