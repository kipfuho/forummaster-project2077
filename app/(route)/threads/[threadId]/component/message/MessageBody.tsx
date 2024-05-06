'use client'
import { useState } from "react";
import { RichTextReadOnly } from "mui-tiptap";
import useExtensions from "@/app/components/ui/Editor/useExtension";
import { smartTimeConvert } from "@/app/components/utils/HelperFunction";
import { MessageDocument, ReactionDocument, UserDocument } from "@/app/page";
import ReactionBox from "./component/reaction/ReactionBox";

import AttachmentBox from "./component/AttachmentBox";
import dynamic from "next/dynamic";

const MessageEditor = dynamic(() => import('./MessageEditor'));
const MessageUserSectionHeader = dynamic(() => import('./component/MessageUserSectionHeader'));
const MessageUserSectionFooter = dynamic(() => import('./component/MessageUserSectionFooter'));

export default function MessageBody({_message, author}: {_message: MessageDocument, author: UserDocument}) {
	const [message, setMessage] = useState<MessageDocument>(_message);
	const extensions = useExtensions();
	
	return(
		<div className="flex flex-grow flex-col p-2">
			<div className="flex justify-between">
				<span className="text-[0.9rem] text-gray-300">{smartTimeConvert(message.create_time)}</span>
				<MessageUserSectionHeader messageId={message._id} messageUserId={message.user}/>
			</div>
			<div className="flex-grow mt-1">
				<RichTextReadOnly
					extensions={extensions}
					content={message.content}
				/>
			</div>
			<AttachmentBox attachments={message.attachments}/>
			<MessageUserSectionFooter
				authorUsername={author.username}
				message={message}
				setMessage={setMessage}
			/>
		</div>
	)
}