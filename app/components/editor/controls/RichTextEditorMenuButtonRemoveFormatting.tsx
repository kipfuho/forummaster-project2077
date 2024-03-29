import FormatClear from "@mui/icons-material/FormatClear";
import { useRichTextEditorContext } from "../EditorContext";
import RichTextEditorMenuButton, { RichTextEditorMenuButtonProps } from "./RichTextEditorMenuButton";

export type RichTextEditorMenuButtonRemoveFormattingProps = Partial<RichTextEditorMenuButtonProps>;

/**
 * A control button removes all inline formatting of marks by calling Tiptap’s
 * unsetAllMarks command (https://tiptap.dev/api/commands/unset-all-marks).
 */
export default function RichTextEditorMenuButtonRemoveFormatting(
  props: RichTextEditorMenuButtonRemoveFormattingProps
) {
  const editor = useRichTextEditorContext();
  return (
    <RichTextEditorMenuButton
      tooltipLabel="Remove inline formatting"
      IconComponent={FormatClear}
      disabled={!editor?.isEditable || !editor.can().unsetAllMarks()}
      onClick={() => editor?.chain().focus().unsetAllMarks().run()}
      {...props}
    />
  );
}