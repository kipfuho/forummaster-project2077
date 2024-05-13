import { getAlertsV2 } from "@/app/components/utils/fetch/v2/alert";
import { AlertDocument, UserDocument } from "@/app/page";
import { Box, Divider, Menu, MenuItem } from "@mui/material";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function AlertMenu({user}: {user: UserDocument}) {
	// States and handler for Menu
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

	// Get alerts from server
	const [alerts, setAlerts] = useState<AlertDocument[] | null>(null);

	useEffect(() => {
		const getAlerts = async () => {
			const alerts = await getAlertsV2(user._id, "", 5);
			if(alerts) {
				setAlerts(alerts);
			}
		}

		getAlerts().catch((e) => console.log(e));
	}, [user]);

	return (
		<>
			<button
				className="text-gray-400 hover:text-gray-300"
				onClick={handleClick}
			>
				<NotificationsIcon/>
			</button>
			<Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'disablePadding': true
        }}
      >
        <Box sx={{width: 300, bgcolor: grey[900], paddingY: 1}}>
					<p className="px-4">Alerts</p>
					<Divider sx={{borderColor: grey[500], marginY: 1}}/>
					{alerts ?
							<>
								{alerts.map((alert, index) => (
									<Link
										className="hover:underline"
										href={`/account/alerts?alertId=${alert._id}`}
										key={index}
										onClick={handleClose}
									>
										<MenuItem dense>{index + 1 + ". " + alert.detail}</MenuItem>
									</Link>
								))}
							</> :
							<p className="px-4 text-[0.9rem]">You don&#39;t have any alerts</p>
						}
					<Divider sx={{borderColor: grey[500], marginY: 1}}/>
					<Link className="text-red-500 px-4 hover:underline" href='/account/alerts'>Show all</Link>
				</Box>
      </Menu>
		</>
	)
}