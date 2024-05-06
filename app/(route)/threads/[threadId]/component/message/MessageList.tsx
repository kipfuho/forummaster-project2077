import { MessageDocument } from "@/app/page";
import Message from "./Message";

export default function MessageList({messages}: {messages: MessageDocument[], currentMessageId?: string}) {
	return (
		<div>
			{messages.map((message, index) => (
				<Message key={index} message={message}/>
			))}
		</div>
	)
}