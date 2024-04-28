import { UserDocument } from "@/app/page"
import { Box } from "@mui/material"
import Image from "next/image"

export default function SquareAvatar({user, size}: {user: UserDocument, size: number}) {
  if(user.avatar) {
    return (
      <Image src={user.avatar} alt="img" width={size} height={size}/>
    )
  } else {
    return (
      <Box
        width={size} 
        height={size} 
        fontSize={Math.floor(0.7*size)} 
        alignSelf="center" 
        justifyContent="center" 
        textAlign="center" 
        bgcolor="#f97316"
        textTransform="uppercase"
      >{user.username[0]}</Box>
    )
  }
}