import styles from "../forum.module.css";
import { smartTimeConvert } from "@/app/components/utils/HelperFunction";
import { UserAvatar } from "@/app/components/ui/Avatar/UserAvatar";
import { MessageDocument, ThreadDocument, UserDocument } from "@/app/page";
import { getLastestMessageV2 } from "@/app/components/utils/fetch/v2/message";
import Link from "next/link";

/**
 * Component showing lastest message of a thread
 * Specifically time of the change and user who did it
 * @returns 
 */
export default async function LastestMessage({thread}: {thread: ThreadDocument}) {
	const data: [MessageDocument, UserDocument] | null = await getLastestMessageV2(thread._id);

	if(data) {
		return(
			<>
				<Link
					className={`w-[160px] p-1 border-l-[1px] border-gray-400 ${styles.additionInfo}`}
					href={`/threads/${thread._id}?messageId=${data[0]._id}`}
				>
					<p className="text-right">{smartTimeConvert(data[0].update_time)}</p>
					<p className="text-right">{data[1].username}</p>
				</Link>
				
				<div className={`flex px-1 ${styles.additionInfo}`}>
					<UserAvatar user={data[1]} size={36}/>
				</div>
			</>
		)
	} else {
		return (
			<p>Something went wrong!</p>
		)
	}
}