'use client'
import { TextFields } from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";
import {
  LinkBubbleMenu,
  MenuButton,
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
import { RefObject, useState } from "react";
import useExtensions from "./useExtension";
import { uploadImageV2 } from "../../utils/fetch/v2/upload";

async function insertImage(files: any) {
  console.log(files);
	const data: any = [];
	for(let i = 0; i < files.length; i++) {
		let res = await uploadImageV2(files[i]);
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
  const [showMenuBar, setShowMenuBar] = useState(true);
	const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });

  return (
    <Box
      sx={{
        // An example of how editor styles can be overridden. In this case,
        // setting where the scroll anchors to when jumping to headings. The
        // scroll margin isn't built in since it will likely vary depending on
        // where the editor itself is rendered (e.g. if there's a sticky nav
        // bar on your site).
        "& .ProseMirror": {
          "& h1, & h2, & h3, & h4, & h5, & h6": {
            scrollMarginTop: showMenuBar ? 50 : 0,
          },
        },
      }}
    >
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
        RichTextFieldProps={{
          MenuBarProps: {
            hide: !showMenuBar
          },
          footer: (
            <MenuButton
              value="formatting"
              tooltipLabel={
                showMenuBar ? "Hide formatting" : "Show formatting"
              }
              size="small"
              onClick={() =>
                setShowMenuBar((currentState) => !currentState)
              }
              selected={showMenuBar}
              IconComponent={TextFields}
            />
          )
        }}
        content={content}
      >
        {() => (
          <>
            <LinkBubbleMenu />
            <TableBubbleMenu />
          </>
        )}
      </RichTextEditor> 
    </Box>
  );
}