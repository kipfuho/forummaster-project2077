import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import { useRichTextEditorContext } from "../EditorContext";
import RichTextEditorMenuButton, { RichTextEditorMenuButtonProps } from "./RichTextEditorMenuButton";

export type RichTextEditorMenuButtonUnderlineProps = Partial<RichTextEditorMenuButtonProps>;

export default function RichTextEditorMenuButtonUnderline(props: RichTextEditorMenuButtonUnderlineProps) {
  const editor = useRichTextEditorContext();
  return (
    <RichTextEditorMenuButton
      tooltipLabel="Underline"
      tooltipShortcutKeys={["mod", "U"]}
      IconComponent={FormatUnderlinedIcon}
      selected={editor?.isActive("underline") ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleUnderline()}
      onClick={() => editor?.chain().focus().toggleUnderline().run()}
      {...props}
    />
  );
}