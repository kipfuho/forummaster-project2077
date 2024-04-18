import { UserDocument } from "@/app/page";
import SquareAvatar from "./SquareAvatar";
import { Button, Divider } from "@mui/material";
import { smartTimeConvert } from "@/app/components/utils/HelperFunction";

export default function Profile({user}: {user: UserDocument}) {
	return (
		<div className="flex rounded bg-gray-700 p-3">
			<SquareAvatar user={user} size={200}/>
			<div className="flex-grow ml-3">
				<div className="h-[50%]">
					<div className="flex flex-grow justify-between">
						<span className="text-[2rem]">{user.username}</span>
						<Button
							variant="contained" 
							sx={{height: '30px'}}
						>Report</Button>
					</div>
					<div>
						<span className="text-gray-400">Formerly known as:</span>
						<span>?</span>
					</div>
				</div>
				<div className="h-[35%] flex justify-between">
					<div className="flex flex-col items-center">
						<span>Messages</span>
						<span>{user.messages}</span>
					</div>
					<div className="flex flex-col items-center">
						<span>Reactions score</span>
						<span>{user.likes*10}</span>
					</div>
					<div className="flex flex-col items-center">
						<span>Points</span>
						<span>0</span>
					</div>
					<div className="flex flex-col items-center">
						<span>Ratings received</span>
						<span>0</span>
					</div>
				</div>
				<Divider/>
				<div className="mt-2 space-x-1">
					<span className="text-gray-400">Joined:</span>
					<span>{smartTimeConvert(user.create_time)}</span>
					<span className="text-gray-400">Last seen:</span>
					<span>Doing something</span>
				</div>
			</div>
		</div>
	)
}