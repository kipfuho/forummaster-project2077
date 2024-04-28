import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React from 'react'

export default (props: any) => {
  return (
    <NodeViewWrapper>
      <div className="border-l-2 border-[1px] border-gray-400 bg-gray-700 border-l-red-600 divide-y-[1px] divide-gray-400">
        <p className='p-2'>{props.node.attrs.username} said:</p>
        <div className='p-2'>
          <NodeViewContent />
        </div>
      </div>
    </NodeViewWrapper>
  )
}