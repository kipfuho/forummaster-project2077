import { RichTextEditorRef } from "mui-tiptap"
import { RefObject, useRef } from "react"
import { ReplyContext } from "./replyContext";

export type ReplyProviderProps = {
  replyRteRef: RefObject<RichTextEditorRef> | null | undefined;
  children: React.ReactNode;
};

export default function ReplyContextProvider({replyRteRef, children}: ReplyProviderProps) {
	return(
		<ReplyContext.Provider value={replyRteRef}>
			{children}
		</ReplyContext.Provider>
	)
}