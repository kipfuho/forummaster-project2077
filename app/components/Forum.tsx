import { FC } from "react";
import ChatIcon from '@mui/icons-material/Chat';

// Forum components
export const Forum:FC<{children: {forumName: string, forumPath: string}}> = ({children}) => (
  <a className="flex" href={children.forumPath}>
    <div className="px-2 py-3">
      <ChatIcon/>
    </div>
    <div>
      <h3 className="hover:underline">{children.forumName}</h3>
      <span className="mr-5">0 Thread</span>
      <span>0 Messages</span>
    </div>
  </a>
);