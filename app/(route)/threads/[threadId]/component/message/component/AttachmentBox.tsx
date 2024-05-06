import { useImageModalContext } from "../../ImageModalContext/imageModalContext";
import { getFileName } from "../ReplyThread";

export default function AttachmentBox({attachments}: {attachments: string[]}) {
	if(attachments.length > 0) {
		const [_, setImage, _1, setOpen] = useImageModalContext();

		const attachmentClick = (imageUrl: string) => {
			setImage(imageUrl);
			setOpen(true);
		}

		return (
			<div className="border rounded p-2 my-2">
				<h2>Attachments</h2>
				<div className="flex flex-col">
					{attachments.map((link) => (
						<p className="text-red-600 hover:underline hover:text-red-500" onClick={() => attachmentClick(link)}>{getFileName(link)}</p>
					))}
				</div>
			</div>
		)
	}
}