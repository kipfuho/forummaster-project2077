import { Blockquote } from "@tiptap/extension-blockquote";
import { Bold } from "@tiptap/extension-bold";
import { BulletList } from "@tiptap/extension-bullet-list";
import { Code } from "@tiptap/extension-code";
import { CodeBlock } from "@tiptap/extension-code-block";
import { Document } from "@tiptap/extension-document";
import { Dropcursor } from "@tiptap/extension-dropcursor";
import { Gapcursor } from "@tiptap/extension-gapcursor";
import { HardBreak } from "@tiptap/extension-hard-break";
import { History } from "@tiptap/extension-history";
import { Italic } from "@tiptap/extension-italic";
import { Link } from "@tiptap/extension-link";
import { ListItem } from "@tiptap/extension-list-item";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Strike } from "@tiptap/extension-strike";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { Text } from "@tiptap/extension-text";
import { FontFamily } from "@tiptap/extension-font-family";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { TextAlign } from "@tiptap/extension-text-align";
import { FontSize, HeadingWithAnchor, LinkBubbleMenuHandler, ResizableImage, TableImproved } from "mui-tiptap";
import { useMemo } from "react";

export type UseExtensionsOptions = {
  /** Placeholder hint to show in the text input area before a user types a message. */
  placeholder?: string;
};

const CustomLinkExtension = Link.extend({
  inclusive: false,
});

const CustomSubscript = Subscript.extend({
  excludes: "superscript",
});

const CustomSuperscript = Superscript.extend({
  excludes: "subscript",
});

export default function useExtensions({
	placeholder
}: UseExtensionsOptions = {}) {
	return useMemo(() => {
		return [
			// We use some but not all of the extensions from
			// https://tiptap.dev/api/extensions/starter-kit, plus a few additional ones
		
			// Note that the Table extension must come before other nodes. See README
			TableImproved.configure({
				resizable: true,
			}),
			TableRow,
			TableHeader,
			TableCell,
		
			BulletList,
			CodeBlock,
			Document,
			HardBreak,
			ListItem,
			OrderedList,
			Paragraph,
			CustomSubscript,
			CustomSuperscript,
			Text,
		
			// Blockquote must come after Bold, since we want the "Cmd+B" shortcut to
			// have lower precedence than the Blockquote "Cmd+Shift+B" shortcut. See
			// README
			Bold,
			Blockquote,
		
			Code,
			Italic,
			Strike,
			CustomLinkExtension.configure({
				autolink: true,
				linkOnPaste: true,
				openOnClick: false,
			}),
			LinkBubbleMenuHandler,
		
			// Extensions
			Gapcursor,
			HeadingWithAnchor.configure({
				// People shouldn't typically need more than 3 levels of headings, so
				// keep a more minimal set (than the default 6) to keep things simpler
				// and less chaotic.
				levels: [1, 2, 3],
			}),
			FontFamily,
			TextStyle,
			FontSize,
			Color,
			Highlight,
			TextAlign.configure({
				types: ["heading", "paragraph", "image"],
			}),
		
			ResizableImage,
		
			// When images are dragged, we want to show the "drop cursor" for where they'll
			// land
			Dropcursor,
		
			TaskList,
			TaskItem.configure({
				nested: true,
			}),
		
			Placeholder.configure({
				placeholder: "Add your own content here...",
			}),
		
			// We use the regular `History` (undo/redo) extension when not using
			// collaborative editing
			History,
		];
	}, [placeholder]);
}