'use client'
import { UserDocument } from "@/app/page";
import { Box, Tab, Tabs } from "@mui/material";
import { ReactNode, SyntheticEvent, useState } from "react";
import dynamic from "next/dynamic";

// lazy load
const ProfilePost = dynamic(() => import('./ProfilePost'));
const LastestActivity = dynamic(() => import('./LastestActivity'));
const Posting = dynamic(() => import('./Posting'));
const About = dynamic(() => import('./About'));
const PostArea = dynamic(() => import('./PostArea'));

function TabContent({
  children,
  value,
  index
}: {
  children: ReactNode,
  value: number,
  index: number
}) {
  return (
    <div
			role="tabpanel"
		>
			{value === index && children}
		</div>
  )
}

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
      <TabContent value={value} index={0}>
			  <ProfilePost member={member}/>
      </TabContent>
      <TabContent value={value} index={1}>
			  <LastestActivity member={member}/>
      </TabContent>
      <TabContent value={value} index={2}>
			  <Posting member={member}/>
      </TabContent>
      <TabContent value={value} index={3}>
			  <About member={member}/>
      </TabContent>
      <TabContent value={value} index={4}>
			  <PostArea member={member}/>
      </TabContent>
    </Box>
  );
}