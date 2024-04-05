'use client'
import RichTextBox from "@/app/components/ui/Editor/Editor";
import { RichTextEditorRef } from "mui-tiptap";
import { useRef } from "react";

export default function Test() {
  const rteRef = useRef<RichTextEditorRef>(null);

  return (
    <div>
      <RichTextBox rteRef={rteRef}/>
      <button onClick={() => console.log(rteRef.current?.editor?.getHTML())}>click</button>
    </div>
  );
}