import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import QuotesComponent from './QuotesComponent'

export default Node.create({
  name: 'quotesComponent',

  group: 'block',

  content: 'inline*',

  addAttributes() {
    return {
      username: {
        default: "",
      },
      messageId: {
        default: ""
      },
      memberId: {
        default: ""
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'QUOTES',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['QUOTES', mergeAttributes(HTMLAttributes), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(QuotesComponent)
  },
})