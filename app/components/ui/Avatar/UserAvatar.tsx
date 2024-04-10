import Image from "next/image"

export const UserAvatar = ({user, width, height}: {user: any, width: number, height: number}) => {
	if(user.avatar) {
		return(
			<div className="self-center min-w-[52px]">
				<Image className="rounded-[5rem] m-2" width={width} height={height} src={user.avatar} alt="avt"/>
			</div>
		)
	} else {
		return(
			<div className="flex self-center justify-center px-1">
				<span className={`flex justify-center items-center text-[1.8rem] w-[${width}px] h-[${height}px] uppercase rounded-[10rem] text-center bg-orange-500`}>{user.username[0]}</span>
			</div>
		)
	}
}