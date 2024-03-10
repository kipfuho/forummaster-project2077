import { FC } from "react";
import ChatIcon from '@mui/icons-material/Chat';

export const Forum:FC<{children:string}> = ({children}) => (
  <div className="flex">
    <div className="px-2 py-3">
      <ChatIcon/>
    </div>
    <div>
      <h3>{children}</h3>
      <span className="mr-5">0 Thread</span>
      <span>0 Messages</span>
    </div>
  </div>
);