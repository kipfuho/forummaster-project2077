'use client'
import { UserDocument } from "@/app/page";
import { Box, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import ProfilePost from "./ProfilePost";
import LastestActivity from "./LastestActivity";
import Posting from "./Posting";
import About from "./About";
import PostArea from "./PostArea";

export default function ActivityTabs({user}: {user: UserDocument}) {
	const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', marginTop: "20px" }}>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Profile Posts"/>
          <Tab label="Lastest Activity"/>
          <Tab label="Postings"/>
          <Tab label="About"/>
          <Tab label="Post Areas"/>
        </Tabs>
      </Box>
			<ProfilePost value={value} index={0} user={user}/>
			<LastestActivity value={value} index={1} user={user}/>
			<Posting value={value} index={2} user={user}/>
			<About value={value} index={3} user={user}/>
			<PostArea value={value} index={4} user={user}/>
    </Box>
  );
}