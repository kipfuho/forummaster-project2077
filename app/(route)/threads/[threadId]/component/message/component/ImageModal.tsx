'use client'
import { Modal } from "@mui/material";
import Image from "next/image";
import { useImageModalContext } from "../../ImageModalContext/imageModalContext";
import { getFileName } from "@/app/components/utils/HelperFunction";

export function isImageFile(filename: string) {
	// List of common image file extensions
	const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"];

	// Extract the extension from the filename
	const extension = filename.substring(filename.lastIndexOf(".")).toLowerCase();

	// Check if the extension is in the list of image extensions
	return imageExtensions.includes(extension);
}

export default function ImageModal() {
	const [fileUrl, _, open, setOpen] = useImageModalContext();

	return (
		<Modal
			open={open}
			onClose={() => setOpen(false)}
			sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
		>
			{isImageFile(getFileName(fileUrl ?? "")) ?
				<Image 
					src={fileUrl ?? ""} 
					alt="img" 
					sizes="80vh"
					style={{
						height: '80%',
						width: 'auto',
					}}
					width={500} 
					height={500}
				/> :
				<div>
					This is not an image
				</div>
			}
		</Modal>
	)
}