'use client'
import { RichTextReadOnly } from 'mui-tiptap'
import useExtensions from '@/app/components/ui/Editor/useExtension'
import AddAttachment from '../threads/(page)/[threadId]/component/thread/replyBox/AddAttachment';
import { useRef, useState } from 'react';
import { Button } from '@mui/material';

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
  const [links, setLinks] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <Button onClick={() => inputRef.current?.click()}>click me</Button>
      {links.map((link) => (<p>{link}</p>))}
      <AddAttachment setLinks={setLinks} fileInputRef={inputRef}/>
    </>
  )
}