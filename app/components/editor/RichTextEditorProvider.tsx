import { Editor } from "@tiptap/react";
import { RichTextEditorContext } from "./EditorContext";

export type RichTextEditorProviderProps = {
  editor: Editor | null;
  children: React.ReactNode;
};

export default function RichTextEditorProvider({
  editor,
  children,
}: RichTextEditorProviderProps) {
  return (
    <RichTextEditorContext.Provider value={editor}>
      {children}
    </RichTextEditorContext.Provider>
  );
}