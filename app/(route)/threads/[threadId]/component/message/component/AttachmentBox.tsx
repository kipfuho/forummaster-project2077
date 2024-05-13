import { getFileName } from "@/app/components/utils/HelperFunction";
import { useImageModalContext } from "../../ImageModalContext/imageModalContext";

export default function AttachmentBox({attachments}: {attachments: string[]}) {
	const [_, setImage, _1, setOpen] = useImageModalContext();

	if(attachments.length > 0) {
		const attachmentClick = (imageUrl: string) => {
			setImage(imageUrl);
			setOpen(true);
		}

		return (
			<div className="border rounded p-2 my-2">
				<h2>Attachments</h2>
				<div className="flex flex-col">
					{attachments.map((link, index) => (
						<p className="text-red-600 hover:underline hover:text-red-500" key={index} onClick={() => attachmentClick(link)}>{getFileName(link)}</p>
					))}
				</div>
			</div>
		)
	}
}