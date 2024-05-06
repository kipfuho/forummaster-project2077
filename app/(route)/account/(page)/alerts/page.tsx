'use client'
import { Divider } from "@mui/material";
import { grey } from "@mui/material/colors";
import AlertList from "../../component/alert/AlertList";
import { getAlertsV2 } from "@/app/components/utils/fetch/v2/alert";
import { useEffect, useState } from "react";
import { AlertDocument } from "@/app/page";
import { useUserContext } from "@/app/components/context/user/UserContext";
import Loading from "@/app/components/layout/Loading";

export default function Alerts() {
	const [user, _] = useUserContext();
	if(user) {
		const [alerts, setAlerts] = useState<AlertDocument[]>([]);
		const [lastAlert, setLastAlert] = useState<string>("");
		const [loading, setLoading] = useState<boolean>(true);

		useEffect(() => {
			const getAlerts = async () => {
				const alerts = await getAlertsV2(user._id, lastAlert, 10);
				if(alerts) {
					setAlerts(alerts);
					setLoading(false);
				} 
			};

			getAlerts().catch((e) => console.log(e));
		}, [lastAlert]);
		
		return (
			<div className="flex flex-col bg-gray-700 rounded w-full">
				<h2 className='p-2'>Alerts</h2>
				<Divider sx={{borderColor: grey[500]}}/>
				<div className="flex-grow px-2 mt-2">
					{loading ? 
						<Loading/> :
						<AlertList alerts={alerts}/>
					}
				</div>
				<div className="text-center">Pagination</div>
			</div>
		)
	}
}