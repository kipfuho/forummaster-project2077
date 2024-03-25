import Image from "next/image"
import { Suspense } from "react"
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Tooltip } from "@mui/material";
import { MessageType } from "@/app/components/type";

export default function MessageBody({item}: {item: MessageType}) {
	return(
		<Suspense>
			<div className="flex rounded bg-gray-600 my-5">
				<div className="text-center p-2 border-r-gray-500 border-r-[1px]" about="author">
					<Image className="rounded-[10rem] p-2" width={125} height={125} src="/arknights.jpg" alt="img"/>
					<div>Author name</div>
					<div>
						<Tooltip title="Joined">
							<PersonIcon/>
						</Tooltip>
						<span>Join time</span>
					</div>
					<div>
						<Tooltip title="Messages">
							<ChatIcon/>
						</Tooltip>
						<span>Messages</span>
					</div>
					<div>
						<Tooltip title="Likes">
							<ThumbUpIcon/>
						</Tooltip>
						<span>Likes</span>
					</div>
				</div>

				<div className="flex flex-grow flex-col p-2">
					<div>
						{item.send_time.toLocaleString()}
					</div>
					<div 
						className="flex-grow"
						dangerouslySetInnerHTML={{__html: item.content}}
					/>
					<div>
						<span>{item.last_update_time.toLocaleString()}</span>
						<div className="border border-gray-500 border-l-red-700 border-l-2 py-1 px-2 bg-gray-700">
							?Likes
						</div>
					</div>
				</div>
			</div>
		</Suspense>
	)
}