'use client'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

import QuotesComponent from '@/app/components/ui/Editor/extensions/QuotesExtension'
import { RichTextReadOnly } from 'mui-tiptap'

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
    <RichTextReadOnly extensions={[StarterKit, QuotesComponent]} content='<QUOTES username="kip">abccddsadsa ds adsa d</QUOTES>'/>
  )
}