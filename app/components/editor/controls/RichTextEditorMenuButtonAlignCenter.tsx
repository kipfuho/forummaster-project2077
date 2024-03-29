import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import { useRichTextEditorContext } from "../EditorContext";
import RichTextEditorMenuButton, { RichTextEditorMenuButtonProps } from "./RichTextEditorMenuButton";

export type RichTextEditorMenuButtonAlignCenterProps = Partial<RichTextEditorMenuButtonProps>;

export default function RichTextEditorMenuButtonAlignCenter(
  props: RichTextEditorMenuButtonAlignCenterProps
) {
  const editor = useRichTextEditorContext();
  return (
    <RichTextEditorMenuButton
      tooltipLabel="Center align"
      tooltipShortcutKeys={["mod", "Shift", "E"]}
      IconComponent={FormatAlignCenterIcon}
      selected={editor?.isActive({ textAlign: "center" }) ?? false}
      disabled={!editor?.isEditable || !editor.can().setTextAlign("center")}
      onClick={() => editor?.chain().focus().setTextAlign("center").run()}
      {...props}
    />
  );
}