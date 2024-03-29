import { Editor, EditorContent } from "@tiptap/react";
import RichTextEditorMenu from "./controls/RichTextEditorMenu";

export default function RichTextEditorContent({editor}: {editor: Editor}) {
	return(
		<>
			<RichTextEditorMenu/>
			<EditorContent className="rounded border mt-2" editor={editor} />
		</>
	)
}