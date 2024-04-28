import { Suspense } from 'react';
import About from './About';
import ForumStat from './ForumStat';
import QuickNavigation from './QuickNavigation';
import UserMenu from './UserMenu';
import Loading from '../Loading';
 
export default function Footer(){
  return(
    <footer>
      <div className="flex space-x-3">
        <About/>
        <QuickNavigation/>
        <UserMenu/>
        <Suspense fallback={<Loading/>}>
          <ForumStat/>
        </Suspense>
      </div>
    </footer>
  )
}