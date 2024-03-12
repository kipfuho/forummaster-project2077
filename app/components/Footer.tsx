import ArticleIcon from '@mui/icons-material/Article';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';


export default function Footer(){
  return(
    <footer>
      <div className="flex space-x-3">
        <div className="w-[25%] space-y-2">
          <h3>
            <ArticleIcon/>
            <span>About me</span>
          </h3>
          <p>I'm Biu. I have been making this project in second semester of my 3th year in university. I'm eager to learn. I have not used Nextjs before so I chose it for my website!</p>
        </div>
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
        <div className="w-[25%] space-y-2">
          <h3>
            <PersonIcon/>
            <span>User Menu</span>
          </h3>
          <div className='flex flex-col gap-1'>
            <a 
              className="text-red-800 hover:underline hover:brightness-[150%]" 
              href="/"
            >
              Profile
            </a>
            <a 
              className="text-red-800 hover:underline hover:brightness-[150%]" 
              href="/"
            >
              Account Details
            </a>
            <a 
              className="text-red-800 hover:underline hover:brightness-[150%]" 
              href="/"
            >
              News Feed
            </a>
            <a 
              className="text-red-800 hover:underline hover:brightness-[150%]" 
              href="/">
                Log out
            </a>
          </div>
        </div>
        <div className="w-[25%] space-y-2">
          <h3>
            <BarChartIcon/>
            <span>Forum Statistics</span>
          </h3>
          <div className='flex flex-col'>
            <div className='flex'>
              <span>Threads:</span>
              <div className='flex flex-col flex-grow'/>
              <span className='pr-5'>0</span>
            </div>
            <div className='flex'>
              <span>Messages:</span>
              <div className='flex flex-col flex-grow'/>
              <span className='pr-5'>0</span>
            </div>
            <div className='flex'>
              <span>Members:</span>
              <div className='flex flex-col flex-grow'/>
              <span className='pr-5'>0</span>
            </div>
            <div className='flex'>
              <span>Lastest member:</span>
              <div className='flex flex-col flex-grow'/>
              <span className='pr-5'>?</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}