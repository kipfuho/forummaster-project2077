import styles from "../forum.module.css";
import { smartTimeConvert } from "@/app/components/utils/HelperFunction";
import { UserAvatar } from "@/app/components/ui/Avatar/UserAvatar";
import { MessageDocument, ThreadDocument, UserDocument } from "@/app/page";
import { getLastestMessageV2 } from "@/app/components/utils/fetch/v2/message";

export default async function LastestMessage({thread}: {thread: ThreadDocument}) {
	const data: [MessageDocument, UserDocument] = await getLastestMessageV2(thread._id);

	if(data) {
		return(
			<>
				<div className={`w-[160px] p-1 border-l-[1px] border-gray-400 ${styles.additionInfo}`}>
					<p className="text-right">{smartTimeConvert(data[0].update_time)}</p>
					<p className="text-right">{data[1].username}</p>
				</div>
				
				<div className={`flex && ${styles.additionInfo}`}>
					<UserAvatar user={data[1]} width={36} height={36}/>
				</div>
			</>
		)
	} else {
		return (
			"Error"
		)
	}
}