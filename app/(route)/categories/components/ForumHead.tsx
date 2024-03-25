import ChatIcon from '@mui/icons-material/Chat';
import styles from "./category.module.css"
import { extractNameToPath } from '@/app/components/utils/HelperFunction';
import { ForumType } from '@/app/components/type';

// first section of a forum
// contain forum basic information
function ForumAbout({forum}: {forum: ForumType}) {
  return(
    <div className='flex-grow min-w-[50%]'>
      <h3 className="hover:underline font-semibold">{forum.forum_name}</h3>
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
function ForumMetadata2({forum}: {forum: ForumType}) {
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
function LastestThreadUpdate() {
  return(
    <div className={styles.forumLastThreadUpdate}>
      <div className='font-semibold'>
        Thread name
      </div>
      <div className='text-gray-300'>
        Time.Who
      </div>
    </div>
  )
}

// Forum components
export default function ForumHead({item}: {item: ForumType}) {
  return (
    <a className="flex items-center" href={"/forums/" + extractNameToPath(item.forum_name) + "." + item.id}>
      <div className="px-2 py-3 text-red-700">
        <ChatIcon fontSize='large'/>
      </div>
      <ForumAbout forum={item}/>
      <ForumMetadata2 forum={item}/>
      <LastestThreadUpdate/>
    </a>
  )
}