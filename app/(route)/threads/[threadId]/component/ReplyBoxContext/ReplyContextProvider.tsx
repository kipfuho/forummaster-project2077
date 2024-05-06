'use client'
import { RichTextEditorRef } from "mui-tiptap"
import { ReactNode, RefObject, useState } from "react"
import { ReplyContext } from "./replyContext";

export default function ReplyContextProvider({children}: {children: ReactNode}) {
	const [replyRef, setReplyRef] = useState<RefObject<RichTextEditorRef> | null>();
	return(
		<ReplyContext.Provider value={[replyRef, setReplyRef]}>
			{children}
		</ReplyContext.Provider>
	)
}