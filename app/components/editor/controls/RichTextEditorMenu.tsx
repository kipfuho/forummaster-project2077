import RichTextEditorMenuButtonAlignCenter from "./RichTextEditorMenuButtonAlignCenter";
import RichTextEditorMenuButtonAlignJustify from "./RichTextEditorMenuButtonAlignJustify";
import RichTextEditorMenuButtonAlignLeft from "./RichTextEditorMenuButtonAlignLeft";
import RichTextEditorMenuButtonAlignRight from "./RichTextEditorMenuButtonAlignRight";
import RichTextEditorMenuButtonBold from "./RichTextEditorMenuButtonBold";
import RichTextEditorMenuButtonItalic from "./RichTextEditorMenuButtonItalic";
import RichTextEditorMenuButtonRemoveFormatting from "./RichTextEditorMenuButtonRemoveFormatting";
import RichTextEditorMenuButtonUnderline from "./RichTextEditorMenuButtonUnderline";

export default function RichTextEditorMenu() {
	return(
		<>
			<RichTextEditorMenuButtonBold/>
			<RichTextEditorMenuButtonItalic/>
			<RichTextEditorMenuButtonUnderline/>
			<RichTextEditorMenuButtonAlignLeft/>
			<RichTextEditorMenuButtonAlignCenter/>
			<RichTextEditorMenuButtonAlignRight/>
			<RichTextEditorMenuButtonAlignJustify/>
			<RichTextEditorMenuButtonRemoveFormatting/>
		</>
	)
}