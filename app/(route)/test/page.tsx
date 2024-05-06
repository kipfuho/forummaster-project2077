'use client'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

import QuotesComponent from '@/app/components/ui/Editor/extensions/QuotesExtension'
import { RichTextReadOnly } from 'mui-tiptap'
import DebounceInput from '@/app/components/ui/DebouceInput'

export default () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      QuotesComponent,
    ],
    content: `
    
    `,
  })

  return (
    <form><DebounceInput
    ref={null}
    debounceTimeout={1000}
    handleDebounce={(value: string) => {console.log(value)}}
    name='author'
    placeholder="Author"
    sx={{fontSize: 15}}
    fullWidth
  /></form>
  )
}