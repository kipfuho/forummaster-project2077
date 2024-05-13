'use client'
import Loading from '@/app/components/layout/Loading'
import { getMessageV2 } from '@/app/components/utils/fetch/v2/message'
import { MessageDocument } from '@/app/page'
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function QuotesComponent(props: any) {
  const path = usePathname();
  const [message, setMessage] = useState<MessageDocument | null>(null);
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    const getQuotedMessage = async () => {
      const message = await getMessageV2(props.node.attrs.messageId);
      setMessage(message);
      setDone(true);
    }

    getQuotedMessage().catch((e) => console.log(e));
  }, [props.node.attrs.messageId]);

  return (
    <NodeViewWrapper>
      <div className="border-l-2 border-[1px] border-gray-400 bg-gray-700 border-l-red-600 divide-y-[1px] divide-gray-400 mb-1">
        <Link 
          className='p-2 text-red-500 flex items-center'
          href={`${path}?messageId=${props.node.attrs.messageId}`}
        >
          <span>{props.node.attrs.username} said:</span>
          <span className='flex rounded-[10rem] bg-gray-800 ml-1'>
            <ArrowUpwardIcon fontSize='small'/>
          </span>
        </Link>
        <div className='p-2'>
          {done ?
            <>
              {message ?
                <div dangerouslySetInnerHTML={{__html: message.content}}/> :
                <p>Message doesn&#39;t exist</p>
              }
            </> :
            <Loading/>
          }
        </div>
      </div>
    </NodeViewWrapper>
  )
}