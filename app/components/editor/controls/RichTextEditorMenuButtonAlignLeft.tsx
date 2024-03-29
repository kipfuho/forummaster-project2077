import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import { useRichTextEditorContext } from "../EditorContext";
import RichTextEditorMenuButton, { RichTextEditorMenuButtonProps } from "./RichTextEditorMenuButton";

export type RichTextEditorMenuButtonAlignLeftProps = Partial<RichTextEditorMenuButtonProps>;

export default function RichTextEditorMenuButtonAlignLeft(props: RichTextEditorMenuButtonAlignLeftProps) {
  const editor = useRichTextEditorContext();
  return (
    <RichTextEditorMenuButton
      tooltipLabel="Left align"
      tooltipShortcutKeys={["mod", "Shift", "L"]}
      IconComponent={FormatAlignLeftIcon}
      selected={editor?.isActive({ textAlign: "left" }) ?? false}
      disabled={!editor?.isEditable || !editor.can().setTextAlign("left")}
      onClick={() => editor?.chain().focus().setTextAlign("left").run()}
      {...props}
    />
  );
}