import { FullUserDocument } from "@/app/page";

export default function Signature({
	member
}: {
	member: FullUserDocument
}) {
	return (
		<div className="p-2">
			Signature: None
		</div>
	)
}