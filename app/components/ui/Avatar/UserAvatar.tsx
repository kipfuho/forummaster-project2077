export const UserAvatar = ({user}: {user:any}) => {
	return(
		<div className="flex justify-center items-center rounded-[10rem] text-center w-[34px] h-[34px] bg-orange-500">
			<span className="text-[1.8rem] uppercase">{user.username[0]}</span>
		</div>
	)
}