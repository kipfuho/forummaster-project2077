import SnackBarCustom from "@/app/components/ui/Popover/SnackBarCustom";
import { uploadAttachmentsV2 } from "@/app/components/utils/fetch/v2/upload";
import { Box, Button, Divider } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";

function ChoosenAttachment({
	files,
	handleRemoveFile
}: {
	files: File[],
	handleRemoveFile: any
}) {
	const getFileLink = (file: File) => {
    // For local files
    return URL.createObjectURL(file);
  };

	if(files.length > 0) {
		return (
			<>
				<h2 className="p-2 text-gray-300">Choosen files</h2>
				<Divider sx={{borderColor: grey[400]}}/>
				{files.map((file, index) => (
					<Box
						display='flex'
						justifyContent='space-between'
						flexGrow='1'
						padding={1}
						key={index}
					>
						<p className="text-red-600">{file.name}</p>
						<Button
							sx={{height: "25px"}} 
							variant="contained"
							onClick={() => handleRemoveFile(file)}
						>Remove</Button>
					</Box>
				))}
			</>
		)
	}
}

export default function AddAttachment({
	setLinks,
	fileInputRef
}: {
	setLinks: Dispatch<SetStateAction<string[]>>,
	fileInputRef: MutableRefObject<HTMLInputElement | null>
}) {
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [state, setState] = useState<any>({ message: '', open: false });

	const handleRemoveFile = (file: File) => {
		setSelectedFiles(selectedFiles.filter((f) => f !== file));
	}

	const handleFileChange = (fileList: FileList) => {
		const files = Array.from(fileList);
		if(files.length <= 10) {
			files.forEach(file => {
				if(file.size > 10*1024*1024) {
					console.log('Choose file less than 10MB');
					return;
				}
			});

			setSelectedFiles(files);
		}
		setState({...state, message: "ok", open: true});
	}
	
	const uploadClick = async () => {
		const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('attachments', file);
    });

		const result = await uploadAttachmentsV2(formData);
		setLinks((prev: string[]) => [...prev, ...result.link]);
	}

	return (
		<Box sx={{backgroundColor: grey[700], borderRadius: 1}}>
			<ChoosenAttachment
				files={selectedFiles}
				handleRemoveFile={handleRemoveFile}
			/>
			{selectedFiles.length > 0 &&
				<Box
					textAlign='center'
					padding={1}
					borderTop={1}
					sx={{borderColor: grey[400]}}
				>
					<Button
						variant="contained"
						sx={{height: '30px'}}
						onClick={uploadClick}
					>Upload</Button>
				</Box>
			}
			<input
				className="hidden"
				title="Choose file to upload"
				ref={fileInputRef}
				name="image"
				type="file"
				multiple
				onChange={(e) => {
					if(e.target.files) {
						handleFileChange(e.target.files);
					}

					e.target.value = ''; // clear the input so the same file can be re-uploaded
				}}
			/>
			<SnackBarCustom state={state}/>
		</Box>
	)
}