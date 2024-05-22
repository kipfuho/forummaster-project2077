'use client'
import { useEffect, useRef, useState } from "react";
import { RichTextReadOnly } from "mui-tiptap";
import useExtensions from "@/app/components/ui/Editor/useExtension";
import { smartTimeConvert } from "@/app/components/utils/HelperFunction";
import { MessageDocument, UserDocument } from "@/app/page";
import AttachmentBox from "./component/AttachmentBox";
import dynamic from "next/dynamic";
import ImageModal from "./component/ImageModal";

const MessageEditor = dynamic(() => import('./MessageEditor'));
const MessageUserSectionHeader = dynamic(() => import('./component/MessageUserSectionHeader'));
const MessageUserSectionFooter = dynamic(() => import('./component/MessageUserSectionFooter'));

/**
 * Body of a message in a thread
 * @returns 
 */
export default function MessageBody({
	_message,
	author,
	currentMessageId
}: {
	_message: MessageDocument,
	author: UserDocument,
	currentMessageId: string | undefined
}) {
	const [message, setMessage] = useState<MessageDocument>(_message);
	const [editView, setEditView] = useState<boolean>(false);
	const extensions = useExtensions();
	
	const messageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if(currentMessageId && _message._id === currentMessageId) {
			messageRef.current?.scrollIntoView({behavior: 'smooth'});
			console.log('done');
		} 
	}, [currentMessageId]);
	
	return(
		<div className="flex flex-grow flex-col p-2" ref={messageRef}>
			<div className="flex justify-between">
				<span className="text-[0.9rem] text-gray-300">{smartTimeConvert(message.create_time)}</span>
				<MessageUserSectionHeader
					messageId={message._id}
					messageUserId={message.user}
					editView={editView}
					setEditView={setEditView}
				/>
			</div>
			<div className="flex-grow mt-1">
				{editView ? 
					<MessageEditor
						message={message}
						setMessage={setMessage}
						setEditView={setEditView}
					/> :
					<RichTextReadOnly
						extensions={extensions}
						content={message.content}
					/>
				}
			</div>
			{!editView &&
				<>
					<AttachmentBox attachments={message.attachments}/>
					<ImageModal/>
				</>
			}
			<MessageUserSectionFooter
				authorUsername={author.username}
				message={message}
				setMessage={setMessage}
			/>
		</div>
	)
}