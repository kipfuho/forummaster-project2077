import { PrefixDocument } from "@/app/page";
import { Button } from "@mui/material";
import { useParams } from "next/navigation";

/**
 * Filter a single prefix
 * @param param0 
 * @returns 
 */
export default function FilterPrefix({prefixes}: {prefixes: PrefixDocument[]}) {
	const params = useParams();

	return (
		<div className="p-2">
			<span className="mr-2">Filter threads by prefixes:</span>
			{prefixes.map((prefix, index) => (
				<Button
					key={index}
					sx={{color: "white", backgroundColor: prefix.color, 	marginRight: '4px', paddingX: 1, borderRadius: 1, height: '25px', textTransform: 'none'}}
					href={`/forums/${params.forumId}?prefixId=${prefix.id}`}
				>{prefix.name}</Button>
			))}
		</div>
	)
}