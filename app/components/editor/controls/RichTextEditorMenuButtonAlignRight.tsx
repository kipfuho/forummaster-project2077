import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import { useRichTextEditorContext } from "../EditorContext";
import RichTextEditorMenuButton, { RichTextEditorMenuButtonProps } from "./RichTextEditorMenuButton";

export type RichTextEditorMenuButtonAlignRightProps = Partial<RichTextEditorMenuButtonProps>;

export default function RichTextEditorMenuButtonAlignRight(props: RichTextEditorMenuButtonAlignRightProps) {
  const editor = useRichTextEditorContext();
  return (
    <RichTextEditorMenuButton
      tooltipLabel="Right align"
      tooltipShortcutKeys={["mod", "Shift", "R"]}
      IconComponent={FormatAlignRightIcon}
      selected={editor?.isActive({ textAlign: "right" }) ?? false}
      disabled={!editor?.isEditable || !editor.can().setTextAlign("right")}
      onClick={() => editor?.chain().focus().setTextAlign("right").run()}
      {...props}
    />
  );
}