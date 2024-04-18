import { UserDocument } from "@/app/page";

export default function LastestActivity({value, index, user}: {value: number, index: number, user: UserDocument}) {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
		>
			Lastest Activity
		</div>
	)
}