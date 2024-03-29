import FormatBold from "@mui/icons-material/FormatBold";
import { useRichTextEditorContext } from "../EditorContext";
import RichTextEditorMenuButton, { RichTextEditorMenuButtonProps } from "./RichTextEditorMenuButton";

export type RichTextEditorMenuButtonBoldProps = Partial<RichTextEditorMenuButtonProps>;

export default function RichTextEditorMenuButtonBold(props: RichTextEditorMenuButtonBoldProps) {
  const editor = useRichTextEditorContext();
  return (
    <RichTextEditorMenuButton
      tooltipLabel="Bold"
      tooltipShortcutKeys={["mod", "B"]}
      IconComponent={FormatBold}
      selected={editor?.isActive("bold") ?? false}
      disabled={!editor?.isEditable || !editor.can().toggleBold()}
      onClick={() => editor?.chain().focus().toggleBold().run()}
      {...props}
    />
  );
}