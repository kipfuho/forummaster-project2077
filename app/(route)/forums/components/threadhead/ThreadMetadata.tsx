import { ThreadDocument } from "@/app/page";
import styles from "../forum.module.css";

export default function ThreadMetadata({thread}: {thread: ThreadDocument}) {
	return (
		<div className={`w-[115px] py-1 px-2 ${styles.additionInfo}`}>
			<div className="flex justify-between">
				<span>Replies:</span>
				<span>{thread.replies}</span>
			</div>
			<div className="flex justify-between">
				<span>Views:</span>
				<span>{thread.views}</span>
			</div>
		</div>
	)
}