import { Box, Button, Divider, Menu } from "@mui/material";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import { useState } from "react";
import MailIcon from '@mui/icons-material/Mail';

export default function ConversationMenu() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

	return (
		<>
			<Button
        variant="outlined"
        onClick={handleClick}
      ><MailIcon/></Button>
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
				<p className="px-4">Conversations</p>
					<Divider sx={{borderColor: grey[500], marginY: 1}}/>
					<div className="px-4 mb-2 text-[0.9rem]">You don&#39;t have any conversations</div>
					<Divider sx={{borderColor: grey[500], marginBottom: 1}}/>
					<Link className="text-red-500 px-4 hover:underline" href='/conversations'>Show all</Link>
				</Box>
      </Menu>
		</>
	)
}