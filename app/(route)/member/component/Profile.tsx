import { UserDocument } from "@/app/page";
import SquareAvatar from "./SquareAvatar";
import { Button, Divider } from "@mui/material";
import { smartTimeConvert } from "@/app/components/utils/HelperFunction";
import dynamic from "next/dynamic";
import ReportButton from "./ReportButton";

const FollowButton = dynamic(() => import('./FollowButton'));

export default function Profile({
	member,
}: {
	member: UserDocument,
}) {
	return (
		<div className="flex rounded bg-gray-700 p-3">
			<SquareAvatar user={member} size={200}/>
			<div className="flex-grow ml-3">
				<div className="h-[50%]">
					<div className="flex flex-grow justify-between">
						<span className="text-[2rem]">{member.username}</span>
						<ReportButton memberId={member._id}/>
					</div>
					{member.oldUsername &&
						<div>
							<span className="text-gray-400">Formerly known as:</span>
							<span>{member.oldUsername}</span>
						</div>
					}
				</div>
				<div className="h-[35%] flex justify-between">
					<div className="flex flex-col items-center">
						<span>Messages</span>
						<span>{member.messages}</span>
					</div>
					<div className="flex flex-col items-center">
						<span>Reactions score</span>
						<span>{member.likes*10}</span>
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
				<div className="flex justify-between mt-2 space-x-1">
					<span>
						<span className="text-gray-400">Joined:</span>
						<span>{smartTimeConvert(member.create_time)}</span>
						<span className="text-gray-400">Last seen:</span>
						<span>Doing something</span>
					</span>
					<FollowButton memberId={member._id}/>
				</div>
			</div>
		</div>
	)
}