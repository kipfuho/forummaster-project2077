import { Box } from "@mui/material"
import Image from "next/image"
import Link from "next/link"

/**
 * Custom Avatar with Link to profile
 * @param param.user : UserDoc
 * @param param.size : avatar size
 */
export const UserAvatar = ({
	user,
	size
}: {
	user: {
		_id: string,
		avatar: string | null,
		username: string
	},
	size: number
}) => {
	if(user.avatar) {
		return(
			<Link
				className="self-center min-w-[52px] bg-orange-500"
				href={`/member/${user._id}`}
				title="Go to this user profile"
			>
				<Image className="rounded-[5rem] m-2" width={size} height={size} src={user.avatar} alt="avt"/>
			</Link>
		)
	} else {
		return(
			<Link
				className="flex"
				href={`/member/${user._id}`}
				title="Go to this user profile"
			>
				<Box
					width={size} 
					height={size} 
					fontSize={Math.floor(0.7*size)} 
					borderRadius="10rem" 
					alignSelf="center" 
					justifyContent="center" 
					textAlign="center" 
					bgcolor="#f97316"
					textTransform="uppercase"
				>{user.username[0]}</Box>
			</Link>
		)
	}
}