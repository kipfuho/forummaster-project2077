'use client'
import RichTextEditor from "@/app/components/editor/RichTextEditor";
import ProtectedLayout from "@/app/components/layout/ProtectedLayout";
import PostThreadBody from "./components/PostThreadBody";

export default function CreateThread() {
  return(
    <ProtectedLayout>
      <RichTextEditor>
        <PostThreadBody/>
      </RichTextEditor>
    </ProtectedLayout>
  )
}