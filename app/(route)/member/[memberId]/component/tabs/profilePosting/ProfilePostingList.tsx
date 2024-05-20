import { getProfilePostV2 } from "@/app/components/utils/fetch/v2/profilepost";
import { ProfilePostingDocument, UserDocument } from "@/app/page";
import { Box, Button } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ProfilePostingItem from "./ProfilePostingItem";
import { grey } from "@mui/material/colors";

export default function ProfilePostingList({
	member,
	pps,
	setPps
}: {
	member: UserDocument,
	pps: ProfilePostingDocument[],
	setPps: Dispatch<SetStateAction<ProfilePostingDocument[]>>
}) {
	const [lastPp, setLastPp] = useState<string | null>(null);
	const [showmore, setShowmore] = useState<boolean>(true);
	const [done, setDone] = useState<boolean>(false);

	useEffect(() => {
		// make sure we wont fetch data twice
		if(lastPp || !pps.length) {
			const getPp = async () => {
				setDone(false);
				const result = await getProfilePostV2(member._id, lastPp ?? '');
				setPps([...pps, ...result.item]);
				setDone(true);
				if(result.item.length < 5) {
					setShowmore(false);
				}
			};
	
			getPp().catch((e) => console.log(e));
		}
	}, [lastPp]);

	return (
		<Box marginTop={1} sx={{backgroundColor: grey[800], borderRadius: 1}}>
			{pps.map((pp, index) => (
				<ProfilePostingItem key={index} profilePosting={pp}/>
			))}
			<Box padding={1}>
				{showmore &&
					<Button
						variant="outlined"
						disabled={!done}
						sx={{height: '30px', width: '110px', padding: 0}}
						onClick={() => setLastPp(pps[pps.length - 1]._id)}
					>Show more</Button>
				}
			</Box>
		</Box>
	)
}