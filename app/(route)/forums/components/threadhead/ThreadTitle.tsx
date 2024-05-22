import { smartTimeConvert } from "@/app/components/utils/HelperFunction";
import { ThreadDocument, UserDocument } from "@/app/page";
import { Button } from "@mui/material";

/**
 * Component showing thread's title
 * Containing prefixes, thread's author and create time
 * @returns 
 */
export default function ThreadTitle({
	thread,
	author
}: {
	thread: ThreadDocument,
	author: UserDocument
}) {
	return (
		<div className="flex-grow py-1 px-2 border-x-[1px] border-gray-400">
			<div className="flex">
				<div>
					{thread.prefix.map((prefix, index) => (
						<Button
							key={index}
							sx={{color: "white", backgroundColor: prefix.color, 	marginRight: '4px', paddingX: 1, borderRadius: 1, height: '25px', textTransform: 'none'}}
							disabled={true}
						>{prefix.name}</Button>
					))}
				</div>
				<div className="font-bold text-[1rem] hover:underline">
					{thread.title}
				</div>
			</div>
			<div className="flex space-x-4 text-[0.9rem]">
				<div>
					{author.username}
				</div>
				<div>
					{smartTimeConvert(thread.create_time)}
				</div>
			</div>
		</div>
	)
}