import { FullUserDocument } from "@/app/page";
import { format, getYear } from "date-fns";

export default function UserDetail({
	member
}: {
	member: FullUserDocument
}) {
	return (
		<div className="p-2">
			<p>
				<span>Birthday: </span>
				<span>
					{member.setting.date_of_birth ? `${format(member.setting.date_of_birth, "MMM dd, YYYY")} (Age: ${getYear(new Date()) - getYear(member.setting.date_of_birth)})` : "Unset"}
				</span>
			</p>
			<p>
				<span>Location: </span>
				<span>{member.setting.location ? member.setting.location : "Unset"}</span>
			</p>
		</div>
	)
}