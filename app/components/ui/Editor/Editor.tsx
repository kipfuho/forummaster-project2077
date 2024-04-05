import { useTheme } from "@mui/material";
import {
  LinkBubbleMenu,
  MenuButtonAddTable,
  MenuButtonBlockquote,
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonCode,
  MenuButtonCodeBlock,
  MenuButtonEditLink,
  MenuButtonHighlightColor,
  MenuButtonImageUpload,
  MenuButtonItalic,
  MenuButtonOrderedList,
  MenuButtonRemoveFormatting,
  MenuButtonStrikethrough,
  MenuButtonSubscript,
  MenuButtonSuperscript,
  MenuButtonTaskList,
  MenuButtonTextColor,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectFontFamily,
  MenuSelectFontSize,
  MenuSelectHeading,
  MenuSelectTextAlign,
  RichTextEditor,
  TableBubbleMenu,
  type RichTextEditorRef,
} from "mui-tiptap";
import { RefObject } from "react";
import useExtensions from "./useExtension";
import { UploadImage } from "../../utils/fetch/data";

async function insertImage(files: any) {
	const data: any = [];
	for(let i = 0; i < files.length; i++) {
		let res = await UploadImage(files[i]);
		if(res !== null) {
			data.push({src: res.link, alt: "img"})
		} else {
			console.log(`upload failed, ${files[i]}`)
		}
	}
	return data;
}

export default function RichTextBox({rteRef, content}: {rteRef: RefObject<RichTextEditorRef>, content?: string}) {
	const theme = useTheme();
	const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });

  return (
    <>
      <RichTextEditor
        ref={rteRef}
        extensions={extensions}
        renderControls={() => (
          <MenuControlsContainer>
						<MenuSelectFontFamily
							options={[
								{ label: "Comic Sans", value: "Comic Sans MS, Comic Sans" },
								{ label: "Cursive", value: "cursive" },
								{ label: "Monospace", value: "monospace" },
								{ label: "Serif", value: "serif" },
							]}
						/>

						<MenuDivider />

            <MenuSelectHeading />

            <MenuDivider />

						<MenuSelectFontSize />

						<MenuDivider />

            <MenuButtonBold />
            <MenuButtonItalic />
            <MenuButtonStrikethrough />
            <MenuButtonSubscript />
            <MenuButtonSuperscript />

            <MenuDivider />

						<MenuButtonTextColor
							defaultTextColor={theme.palette.text.primary}
							swatchColors={[
								{ value: "#000000", label: "Black" },
								{ value: "#ffffff", label: "White" },
								{ value: "#888888", label: "Grey" },
								{ value: "#ff0000", label: "Red" },
								{ value: "#ff9900", label: "Orange" },
								{ value: "#ffff00", label: "Yellow" },
								{ value: "#00d000", label: "Green" },
								{ value: "#0000ff", label: "Blue" },
							]}
						/>

						<MenuButtonHighlightColor
							swatchColors={[
								{ value: "#595959", label: "Dark grey" },
								{ value: "#dddddd", label: "Light grey" },
								{ value: "#ffa6a6", label: "Light red" },
								{ value: "#ffd699", label: "Light orange" },
								// Plain yellow matches the browser default `mark` like when using Cmd+Shift+H
								{ value: "#ffff00", label: "Yellow" },
								{ value: "#99cc99", label: "Light green" },
								{ value: "#90c6ff", label: "Light blue" },
								{ value: "#8085e9", label: "Light purple" },
							]}
						/>

						<MenuDivider />

            <MenuButtonEditLink />
						<MenuButtonImageUpload
							onUploadFiles={insertImage}
						/>

						<MenuDivider />

						<MenuSelectTextAlign />

            <MenuDivider />

            <MenuButtonOrderedList />
            <MenuButtonBulletedList />
            <MenuButtonTaskList />

            <MenuDivider />

            <MenuButtonBlockquote />

            <MenuDivider />

            <MenuButtonCode />

            <MenuButtonCodeBlock />

            <MenuDivider />

            <MenuButtonAddTable />

            <MenuDivider />

            <MenuButtonRemoveFormatting />
          </MenuControlsContainer>
        )}
        content={content}
      >
        {() => (
          <>
            <LinkBubbleMenu />
            <TableBubbleMenu />
          </>
        )}
      </RichTextEditor> 
    </>
  );
}