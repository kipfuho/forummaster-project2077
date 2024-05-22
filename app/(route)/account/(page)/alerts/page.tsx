'use client'
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import AlertList from "../../components/alert/AlertList";
import { getAlertsV2 } from "@/app/components/utils/fetch/v2/alert";
import { useEffect, useState } from "react";
import { AlertDocument } from "@/app/page";
import { useUserContext } from "@/app/components/context/user/UserContext";
import Loading from "@/app/components/layout/Loading";

export default function Alerts() {
	const [user, _] = useUserContext();
	const [alerts, setAlerts] = useState<AlertDocument[]>([]);
	const [lastAlert, setLastAlert] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if(user) {
			const getAlerts = async () => {
				const alerts = await getAlertsV2(user._id, lastAlert, 10);
				if(alerts) {
					setAlerts(alerts);
					setLoading(false);
				} 
			};
	
			getAlerts().catch((e) => console.log(e));
		}
	}, [lastAlert, user]);
	
	return (
		<>
			<h2>Alerts</h2>
			<Box
				display='flex'
				flexDirection='column'
				borderRadius={1}
				mt={2}
				sx={{backgroundColor: grey[700]}}
			>
				{alerts.length > 0 ? 
					<>
						<div className="flex-grow px-2 mt-2">
							{loading ? 
								<Loading/> :
								<AlertList alerts={alerts}/>
							}
						</div>
						<div className="text-center">Pagination</div>
					</> : 
					<p>You do not have any recent alerts!</p>
				}
			</Box>
		</>
	)
}