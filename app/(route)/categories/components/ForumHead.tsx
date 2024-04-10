import ChatIcon from '@mui/icons-material/Chat';
import styles from "./category.module.css"
import { smartTimeConvert } from '@/app/components/utils/HelperFunction';
import { Suspense } from 'react';
import Loading from '@/app/components/layout/Loading';
import Link from 'next/link';
import { ForumDocument, MessageDocument, ThreadDocument, UserDocument } from '@/app/page';
import { getLastestThreadV2 } from '@/app/components/utils/fetch/v2/thread';
import { getForumV2 } from '@/app/components/utils/fetch/v2/forum';

// first section of a forum
// contain forum basic information
function ForumAbout({forum}: {forum: ForumDocument}) {
  return(
    <div className='flex-grow min-w-[50%]'>
      <h3 className="hover:underline font-semibold">{forum.name}</h3>
      <div dangerouslySetInnerHTML={{__html: forum.about}}/>
      <div className={`min-w-[160px] space-x-2 ${styles.forumMeta1}`}>
        <div className="flex items-center space-x-1 text-[0.9rem]">
          <span>{forum.threads}</span>
          <span className='text-gray-300'>Threads</span>
        </div>
        <div className='flex items-center space-x-1 text-[0.9rem]'>
          <span>{forum.messages}</span>
          <span className='text-gray-300'>Messages</span>
        </div>
      </div>
    </div>
  )
}

// second section of a forum introduction
// contain metadata of a forum: threads and messages count
// show when the web is width enough
function ForumMetadata2({forum}: {forum: ForumDocument}) {
  return(
    <div className={`min-w-[160px] px-2 divide-x-[1px] divide-gray-400 ${styles.forumMeta2}`}>
      <div className="flex flex-col items-center px-2">
        <span>{forum.threads}</span>
        <span className='text-[0.8rem] text-gray-300'>Threads</span>
      </div>
      <div className='flex flex-col items-center px-2'>
        <span>{forum.messages}</span>
        <span className='text-[0.8rem] text-gray-300'>Messages</span>
      </div>
    </div>
  )
}

// last section of a forum introduction
// contain information about the thread with lastest update time
async function LastestThreadUpdate({forum}: {forum: ForumDocument}) {
  const data: [ThreadDocument, MessageDocument, UserDocument] = await getLastestThreadV2(forum._id);
  if(data) {
    return(
      <div className={styles.forumLastThreadUpdate}>
        <div className='font-semibold'>
          {data[0].title}
        </div>
        <div className='text-gray-300'>
          {smartTimeConvert(data[1].update_time) + " · " + data[2].username}
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles.forumLastThreadUpdate}>
        N/A
      </div>
    )
  }
}

// Forum components
export default async function ForumHead({forum}: {forum: ForumDocument}) {
  return (
    <Link className="flex items-center" href={"/forums/" + forum._id}>
      <div className="px-2 py-3 text-red-700">
        <ChatIcon fontSize='large'/>
      </div>
      <ForumAbout forum={forum}/>
      <ForumMetadata2 forum={forum}/>
      <Suspense fallback={<Loading/>}>
        <LastestThreadUpdate forum={forum}/>
      </Suspense>
    </Link>
  )
}