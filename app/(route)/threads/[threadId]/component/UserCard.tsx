import { Tooltip } from "@mui/material";
import Image from "next/image";
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Suspense } from "react";
import Loading from "@/app/components/layout/Loading";
import { smartTimeConvert } from "@/app/components/utils/HelperFunction";
import { UserDocument } from "@/app/page";
import { UserAvatar } from "@/app/components/ui/Avatar/UserAvatar";

export default async function UserCard({user}: {user: UserDocument}) {
	return(
		<Suspense fallback={<Loading/>}>
			<div className="p-2 border-r-gray-500 border-r-[1px] min-w-[142px] overflow-hidden" about="author">
				<UserAvatar user={user} size={125}/>
				<div className="text-center">{user.username}</div>
				<div className="space-x-2">
					<Tooltip title="Joined">
						<PersonIcon fontSize="small"/>
					</Tooltip>
					<span className="text-[0.9rem]">{smartTimeConvert(user.create_time)}</span>
				</div>
				<div className="overflow-hidden space-x-2">
					<Tooltip title="Messages">
						<ChatIcon fontSize="small"/>
					</Tooltip>
					<span className="text-[0.9rem]">{user.messages}</span>
				</div>
				<div className="space-x-2">
					<Tooltip title="Likes">
						<ThumbUpIcon fontSize="small"/>
					</Tooltip>
					<span className="text-[0.9rem]">{user.likes}</span>
				</div>
			</div>
		</Suspense>
	)
}