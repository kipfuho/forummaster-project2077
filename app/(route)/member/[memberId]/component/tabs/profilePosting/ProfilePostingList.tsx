import { getProfilePostV2 } from "@/app/components/utils/fetch/v2/profilepost";
import { ProfilePostingDocument, UserDocument } from "@/app/page";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ProfilePostingItem from "./ProfilePostingItem";
import { grey } from "@mui/material/colors";

export default function ProfilePostingList({
	member,
}: {
	member: UserDocument
}) {
	// pps: profilePostingS
	const [pps, setPps] = useState<ProfilePostingDocument[]>([]);
	const [lastPp, setLastPp] = useState<string | null>(null);

	useEffect(() => {
		const getPp = async () => {
			const result = await getProfilePostV2(member._id, lastPp ?? '');
			if(result) {
				setPps(pps.concat(result.item));
				console.log(result);
			}
		};

		getPp().catch((e) => console.log(e));
	}, [lastPp]);

	return (
		<Box marginTop={1} sx={{backgroundColor: grey[800], padding: 1, borderRadius: 1}}>
			{pps.map((pp, index) => (
				<ProfilePostingItem key={index} profilePosting={pp}/>
			))}
		</Box>
	)
}