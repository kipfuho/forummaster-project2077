import { Suspense } from "react"
import { MessageType } from "@/app/components/type";
import { format } from "date-fns";
import UserCard from "./UserCard";

export default function MessageBody({item}: {item: MessageType}) {
	return(
		<Suspense>
			<div className="flex rounded bg-gray-600 my-5">
				<UserCard user_mail={item.sender_email}/>
				<div className="flex flex-grow flex-col p-2">
					<div>
						{format(item.send_time.toLocaleString(), "MMM dd, yyyy")}
					</div>
					<div 
						className="flex-grow"
						dangerouslySetInnerHTML={{__html: item.content}}
					/>
					<div>
						{item.last_update_time !== null &&
							<span>{format(item.last_update_time.toLocaleString(), "MMM dd, yyyy")}</span>
						}
						<div className="border border-gray-500 border-l-red-700 border-l-2 py-1 px-2 bg-gray-700">
							?Likes
						</div>
					</div>
				</div>
			</div>
		</Suspense>
	)
}