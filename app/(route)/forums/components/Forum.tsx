import { ForumType } from '@/app/page';
import ChatIcon from '@mui/icons-material/Chat';

// Forum components
export default function Forum({children}: {children: ForumType}) {
  return (
    <a className="flex" href={"/forums/" + children.forum_name.toLowerCase() + "." + children.id}>
      <div className="px-2 py-3">
        <ChatIcon/>
      </div>
      <div>
        <h3 className="hover:underline">{children.forum_name}</h3>
        <span className="mr-5">{children.threads} Thread</span>
        <span>{children.messages} Messages</span>
      </div>
    </a>
  )
}