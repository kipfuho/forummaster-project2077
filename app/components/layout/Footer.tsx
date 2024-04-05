import ArticleIcon from '@mui/icons-material/Article';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useEffect, useState } from 'react';
import { useUserContext } from './UserContext';
import { GetMetadata } from '../utils/fetch/data';

// about myself and what this forum is about
function About() {
  return(
    <div className="w-[25%] space-y-2">
      <h3>
        <ArticleIcon/>
        <span>About me</span>
      </h3>
      <p>I'm Biu. I have been making this project in second semester of my 3th year in university. I'm eager to learn. I have not used Nextjs before so I chose it for my website!</p>
    </div>
  )
}

// navigate to other social media
function QuickNavigation() {
  return(
    <div className="w-[25%] space-y-2">
      <h3>
        <FormatListBulletedIcon/>
        <span>Quick navigation</span>
      </h3>
      <div className='flex flex-col gap-1'>
        <a className="text-red-800 hover:underline hover:brightness-[150%]" href="https://github.com/kipfuho">Github</a>
        <a className="text-red-800 hover:underline hover:brightness-[150%]" href="https://www.facebook.com/kip.nguyen.33/">Facebook</a>
      </div>
    </div>
  )
}

// quickly navigate to user profile
function UserMenu() {
  return(
    <div className="w-[25%] space-y-2">
      <h3>
        <PersonIcon/>
        <span>User Menu</span>
      </h3>
      <div className='flex flex-col gap-1'>
        <a 
          className="text-red-800 hover:underline hover:brightness-[150%]" 
          href="/account/profile"
        >Profile</a>
        <a 
          className="text-red-800 hover:underline hover:brightness-[150%]" 
          href="/account"
        >Account Details</a>
        <a 
          className="text-red-800 hover:underline hover:brightness-[150%]" 
          href="https://news.google.com/"
        >News Feed</a>
        <a 
          className="text-red-800 hover:underline hover:brightness-[150%]" 
          href="/">Log out</a>
      </div>
    </div>
  )
}

// forum statistics
function ForumStat() {
  const [metadata, setMetadata] = useState<[number, number, number, string]>([0, 0, 0, "?"]); 

  useEffect(() => {
    const getMetadata = async () => {
      const fetchData = await GetMetadata();
      if(fetchData) {
        setMetadata(fetchData);
      }
    }

    getMetadata().catch((e) => console.log(e));
  }, []);

  return(
    <div className="w-[25%] space-y-2">
      <h3>
        <BarChartIcon/>
        <span>Forum Statistics</span>
      </h3>
      <div className='flex flex-col'>
        <div className='flex justify-between'>
          <span>Threads:</span>
          <span className='pr-5'>{metadata[0]}</span>
        </div>
        <div className='flex justify-between'>
          <span>Messages:</span>
          <span className='pr-5'>{metadata[1]}</span>
        </div>
        <div className='flex justify-between'>
          <span>Members:</span>
          <span className='pr-5'>{metadata[2]}</span>
        </div>
        <div className='flex justify-between'>
          <span>Lastest member:</span>
          <span className='pr-5'>{metadata[3]}</span>
        </div>
      </div>
    </div>
  )
}

export default function Footer(){
  const [user, _] = useUserContext();
  return(
    <footer>
      <div className="flex space-x-3">
        <About/>
        <QuickNavigation/>
        {user && <UserMenu/>}
        <ForumStat/>
      </div>
    </footer>
  )
}