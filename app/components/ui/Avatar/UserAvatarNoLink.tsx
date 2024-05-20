import { Box } from "@mui/material"
import Image from "next/image"

export const UserAvatarNoLink = ({
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
			<Image className="rounded-[5rem] m-2" width={size} height={size} src={user.avatar} alt="avt"/>
		)
	} else {
		return(
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
		)
	}
}