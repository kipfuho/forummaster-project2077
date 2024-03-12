import ArticleIcon from '@mui/icons-material/Article';

export default function AccountSideBar(){
  return(
    <div className="rounded w-[300px] bg-gray-700 divide-y-[1px]  ">
      <div className="divide-y-[1px]">
        <h2 className="p-2 space-x-1">
          <ArticleIcon/>
          <span>Your account</span>
        </h2>
        <div className="p-2 space-y-1">
          <div>My profile</div>
          <div>Alerts</div>
          <div>Reactions given</div>
          <div>Reactions received</div>
          <div>Bookmarks</div>
          <div>My Ratings</div>
        </div>
      </div>
      <div className="divide-y-[1px]">
        <h2 className="p-2 space-x-1">
          <ArticleIcon/>
          <span>Settings</span>
        </h2>
        <div>
          <a href='/account'>
            <div className='hover:bg-gray-600 px-2 py-1'>
              <span className='hover:underline'>Account Details</span>
            </div>
          </a>
          <a href='/account/security'>
            <div className='hover:bg-gray-600 px-2 py-1'>
              <span className='hover:underline'>Password and Security</span>
            </div>
          </a>
          <a href='/'>
            <div className='hover:bg-gray-600 px-2 py-1'>
              <span className='hover:underline'>Privacy</span>
            </div>
          </a>
          <a href='/'>
            <div className='hover:bg-gray-600 px-2 py-1'>
              <span className='hover:underline'>Delete Account</span>
            </div>
          </a>
          <a href='/'>
            <div className='rounded hover:bg-gray-600 px-2 py-1'>
              <span className='hover:underline'>Log Out</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}