'use client'
import { RichTextReadOnly } from 'mui-tiptap'
import useExtensions from '@/app/components/ui/Editor/useExtension'

function AComponent() {
  const extensions = useExtensions();

  return (
    <RichTextReadOnly
      extensions={extensions}
      content={"<p>abc<p>"}
    />
  )
}

export default function Test() {

  return (
    <>
      <AComponent/>
      <AComponent/>
      <AComponent/>
      <AComponent/>
      <AComponent/>
      <AComponent/>
      <AComponent/>
      <AComponent/>
      <AComponent/>
      <AComponent/>
      <AComponent/>
      <AComponent/>
      <AComponent/>
      <AComponent/>
      <AComponent/>
      <AComponent/>
      <AComponent/>
      <AComponent/>
      <AComponent/>
      <AComponent/>
    </>
  )
}