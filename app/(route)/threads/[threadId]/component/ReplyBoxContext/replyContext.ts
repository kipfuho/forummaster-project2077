import { createContext, Dispatch, RefObject, SetStateAction, useContext } from "react";
import { RichTextEditorRef } from "mui-tiptap";

export const ReplyContext = createContext<[
  RefObject<RichTextEditorRef> | null | undefined,
  Dispatch<SetStateAction<RefObject<RichTextEditorRef> | null | undefined>>
] | undefined>(
  undefined
);

export function useReplyContext(): [RefObject<RichTextEditorRef> | null | undefined, Dispatch<SetStateAction<RefObject<RichTextEditorRef> | null | undefined>>] {
  const replyContext = useContext(ReplyContext);
	if(replyContext === undefined) {
    throw new Error('useReplyContext must be used within a UserContextProvider');
  }
  return replyContext;
}