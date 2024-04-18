import { UserDocument } from "@/app/page";

export default function About({value, index, user}: {value: number, index: number, user: UserDocument}) {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
		>
			About
		</div>
	)
}