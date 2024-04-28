import { useUserContext } from '@/app/components/layout/UserContext';
import { logoutV2 } from '@/app/components/utils/fetch/v2/user';
import ArticleIcon from '@mui/icons-material/Article';
import Link from 'next/link';
import styles from './account.module.css'
import { Divider } from '@mui/material';
import { grey } from '@mui/material/colors';

export default function AccountSideBar(){
  const [user, _] = useUserContext();
  if(user) {
    return(
      <div className={styles.sidebar}>
        <h2 className="p-2 space-x-1">
          <ArticleIcon/>
          <span>Your account</span>
        </h2>
        <Divider sx={{borderColor: grey[500]}}/>
        <div>
          <Link href={`/member/${user._id}`}>
            <div className='hover:bg-gray-600 px-2 py-1'>My profile</div>
          </Link>
          <Link href='/account/alerts'>
            <div className='hover:bg-gray-600 px-2 py-1'>Alerts</div>
          </Link>
          <Link href='/account/reactions-given'>
            <div className='hover:bg-gray-600 px-2 py-1'>Reactions given</div>
          </Link>
          <Link href='/account/reactions'>
            <div className='hover:bg-gray-600 px-2 py-1'>Reactions received</div>
          </Link>
          <Link href='/account/bookmarks'>
            <div className='hover:bg-gray-600 px-2 py-1'>Bookmarks</div>
          </Link>
          <Link href='/account/my-ratings'>
            <div className='hover:bg-gray-600 px-2 py-1'>My Ratings</div>
          </Link>
        </div>
        <Divider sx={{borderColor: grey[500], marginTop: 1}}/>
        <h2 className="p-2 space-x-1">
          <ArticleIcon/>
          <span>Settings</span>
        </h2>
        <Divider sx={{borderColor: grey[500]}}/>
        <div>
          <Link href='/account/account-details'>
            <div className='hover:bg-gray-600 px-2 py-1'>
              <span className='hover:underline'>Account Details</span>
            </div>
          </Link>
          <Link href='/account/security'>
            <div className='hover:bg-gray-600 px-2 py-1'>
              <span className='hover:underline'>Password and Security</span>
            </div>
          </Link>
          <Link href='/account/privacy'>
            <div className='hover:bg-gray-600 px-2 py-1'>
              <span className='hover:underline'>Privacy</span>
            </div>
          </Link>
          <Link href='/account/delete'>
            <div className='hover:bg-gray-600 px-2 py-1'>
              <span className='hover:underline'>Delete Account</span>
            </div>
          </Link>
          <button className='w-full text-left rounded hover:bg-gray-600 px-2 py-1' onClick={logoutV2}>
            <span className='hover:underline'>Log Out</span>
          </button>
        </div>
      </div>
    )
  }
}