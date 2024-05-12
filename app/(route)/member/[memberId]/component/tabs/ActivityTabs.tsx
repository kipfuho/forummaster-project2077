'use client'
import { UserDocument } from "@/app/page";
import { Box, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import dynamic from "next/dynamic";

// laze load
const ProfilePost = dynamic(() => import('./ProfilePost'));
const LastestActivity = dynamic(() => import('./LastestActivity'));
const Posting = dynamic(() => import('./Posting'));
const About = dynamic(() => import('./About'));
const PostArea = dynamic(() => import('./PostArea'));

// user is the profile user
export default function ActivityTabs({
  member
}: {
  member: UserDocument
}) {
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
			<ProfilePost value={value} index={0} member={member}/>
			<LastestActivity value={value} index={1} member={member}/>
			<Posting value={value} index={2} member={member}/>
			<About value={value} index={3} member={member}/>
			<PostArea value={value} index={4} member={member}/>
    </Box>
  );
}