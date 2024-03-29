'use client'
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import RichTextEditorProvider from "./RichTextEditorProvider"
import { ReactNode } from "react"


export default function RichTextEditor({children}: {children: ReactNode}) {
  const editor = useEditor({
    extensions: [
      StarterKit, 
			Underline,
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			})
    ],
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
    <RichTextEditorProvider editor={editor}>
			{children}
		</RichTextEditorProvider>
  )
}