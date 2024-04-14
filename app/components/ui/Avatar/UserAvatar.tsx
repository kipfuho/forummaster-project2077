import { Box } from "@mui/material"
import Image from "next/image"

export const UserAvatar = ({user, size}: {user: any, size: number}) => {
	if(user.avatar) {
		return(
			<div className="self-center min-w-[52px] bg-orange-500">
				<Image className="rounded-[5rem] m-2" width={size} height={size} src={user.avatar} alt="avt"/>
			</div>
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