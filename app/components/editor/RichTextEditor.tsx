'use client'
import { useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import { Tooltip } from "@mui/material";
import ColorPicker from "./CustomColorPicker";
import FontSizePicker from "./FontSizePicker";

export default function RichTextEditor({ editorId }: {editorId: string}) {
  const [colorPickerAnchor, setColorPickerAnchor] = useState<[number, number]>([0, 0]);
  const [colorPickerHidden, setColorPickerHidden] = useState(true);
  const [color, setColor] = useState('#000000');
  const [fontSizePickerAnchor, setFontSizePickerAnchor] = useState<[number, number]>([0, 0]);
  const [fontSizePickerHidden, setFontSizePickerHidden] = useState(true);

  const formatDoc = (cmd : string, value : string) => {
    document.execCommand(cmd, false, value);
  }

  const openColorPicker = (e : Element) => {
    if(colorPickerHidden) {
      setColorPickerAnchor([e.getBoundingClientRect().left + window.scrollX - 35, e.getBoundingClientRect().top + window.scrollY + 35]);
      setColorPickerHidden(false);
    }
    else {
      setColorPickerHidden(true);
    }
  }

  const openFontSizePicker = (e : Element) => {
    if(fontSizePickerHidden) {
      setFontSizePickerAnchor([e.getBoundingClientRect().left + window.scrollX - 10, e.getBoundingClientRect().top + window.scrollY + 35]);
      setFontSizePickerHidden(false);
    }
    else {
      setFontSizePickerHidden(true);
    }
  }

	return(
		<div>
      <ColorPicker 
        onChangeColor={setColor} 
        onChangeHidden={setColorPickerHidden}
        leftAnchor={colorPickerAnchor[0]} 
        topAnchor={colorPickerAnchor[1]} 
        isHidden={colorPickerHidden}
      />
      <FontSizePicker
        onChangeHidden={setFontSizePickerHidden}
        leftAnchor={fontSizePickerAnchor[0]}
        topAnchor={fontSizePickerAnchor[1]}
        isHidden={fontSizePickerHidden}
      />
      <div>
        <div className="border-t-2 border-amber-600">
          <div className="p-1 border-l-[1px] border-r-[1px]">
            <button 
              className="border"
              onClick={() => formatDoc('removeFormat')}
            >
              <Tooltip title="Remove Formatting">
                <ClearIcon/>
              </Tooltip>
            </button>
            <button 
              className="border ml-3"
              
              onClick={() => formatDoc('bold')}
            >
              <Tooltip title="Bold (Ctrl + B)">
                <FormatBoldIcon/>
              </Tooltip>
            </button>
            <button 
              className="border"
              onClick={() => formatDoc('italic')}
            >
              <Tooltip title="Italic (Ctrl + I)">
                <FormatItalicIcon/>
              </Tooltip>
            </button>
            <button 
              className="border"
              onClick={() => formatDoc('underline')}
            >
              <Tooltip title="Underline (Ctrl + U)">
                <FormatUnderlinedIcon/>
              </Tooltip>
            </button>
            <button 
              className="border"
              onClick={(e) => openColorPicker(e.currentTarget)}
            >
              <Tooltip title="Text color">
                <FormatColorTextIcon/>
              </Tooltip>
            </button>
            <button 
              className="border"
              onClick={() => formatDoc('underline')}
            >
              <Tooltip title="Font Family">
                <TextFormatIcon/>
              </Tooltip>
            </button>
            <button 
              className="border"
              onClick={(e) => openFontSizePicker(e.currentTarget)}
            >
              <Tooltip title="Font size">
                <FormatSizeIcon/>
              </Tooltip>
            </button>
          </div>
        </div>
      </div>
      <div
        id={editorId}
        className="block border min-h-60 text-white p-1 overflow-x-auto"
        contentEditable={true}
      />
		</div>
	)
}