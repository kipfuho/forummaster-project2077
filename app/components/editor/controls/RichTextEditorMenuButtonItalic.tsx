import FormatItalic from "@mui/icons-material/FormatItalic";
import { useRichTextEditorContext } from "../EditorContext";
import RichTextEditorMenuButton, { RichTextEditorMenuButtonProps } from "./RichTextEditorMenuButton";

export type RichTextEditorMenuButtonItalicProps = Partial<RichTextEditorMenuButtonProps>;

export default function RichTextEditorMenuButtonItalic(props: RichTextEditorMenuButtonItalicProps) {
  const editor = useRichTextEditorContext();
  return (
    <RichTextEditorMenuButton
      tooltipLabel="Italic"
      tooltipShortcutKeys={["mod", "I"]}
      IconComponent={FormatItalic}
      selected={editor?.isActive("italic") ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleItalic()}
      onClick={() => editor?.chain().focus().toggleItalic().run()}
      {...props}
    />
  );
}