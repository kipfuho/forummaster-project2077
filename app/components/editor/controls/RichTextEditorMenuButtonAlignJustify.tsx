import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import { useRichTextEditorContext } from "../EditorContext";
import RichTextEditorMenuButton, { RichTextEditorMenuButtonProps } from "./RichTextEditorMenuButton";

export type RichTextEditorMenuButtonAlignJustifyProps = Partial<RichTextEditorMenuButtonProps>;

export default function RichTextEditorMenuButtonAlignJustify(
  props: RichTextEditorMenuButtonAlignJustifyProps
) {
  const editor = useRichTextEditorContext();
  return (
    <RichTextEditorMenuButton
      tooltipLabel="Justify"
      tooltipShortcutKeys={["mod", "Shift", "J"]}
      IconComponent={FormatAlignJustifyIcon}
      selected={editor?.isActive({ textAlign: "justify" }) ?? false}
      disabled={!editor?.isEditable || !editor.can().setTextAlign("justify")}
      onClick={() => editor?.chain().focus().setTextAlign("justify").run()}
      {...props}
    />
  );
}