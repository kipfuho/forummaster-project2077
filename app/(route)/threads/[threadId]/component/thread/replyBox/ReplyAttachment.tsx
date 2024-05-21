import { getFileName } from "@/app/components/utils/HelperFunction";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function ReplyAttachment({
	links,
	handleDelete
}: {
	links: string[] | null,
	handleDelete: any
}) {
	if(links && links.length > 0) {
		const deleteClick = (link: string) => {
			handleDelete(link);
		}

		return (
			<div className="border mt-2 p-2 space-y-2">
			{links.map((link, index) => (
				<div className="flex" key={index}>
					<Image className="max-w-[50px] max-h-[100px]" src={link} alt="file" width={50} height={100}/>
					<div className="flex flex-grow ml-5 justify-between">
						<Link className="text-red-600 hover:brightness-200 hover:underline" href={link}>{getFileName(link)}</Link>
						<Button
							sx={{height: "30px"}} 
							variant="contained"
							onClick={() => deleteClick(link)}
						>Delete</Button>
					</div>
				</div>
			))}
			</div>
		)
	}
}