'use client'
import { useId, useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import { Tooltip } from "@mui/material";
import ColorPicker from "@/app/components/CustomColorPicker";

export default function PostThread() {
	const textColorId = useId();
  const [colorPickerAnchor, setColorPickerAnchor] = useState<[number, number]>([0, 0]);
  const [colorPickerHidden, setColorPickerHidden] = useState(true);
  const [color, setColor] = useState('#000000');

  const formatDoc = (cmd : string, value : string) => {
    document.execCommand(cmd, false, value);
  }

  const openColorPicker = (e : Element) => {
    if(colorPickerHidden) {
      setColorPickerAnchor([e.getBoundingClientRect().left - 35, e.getBoundingClientRect().top + 35]);
      setColorPickerHidden(false);
    }
    else {
      setColorPickerHidden(true);
    }
  }

	return(
		<div>
			<h2>Post thread</h2>
      <ColorPicker 
        onChangeColor={setColor} 
        onChangeHidden={setColorPickerHidden}
        leftAnchor={colorPickerAnchor[0]} 
        topAnchor={colorPickerAnchor[1]} 
        isHidden={colorPickerHidden}
      />
      <button onClick={() => console.log(color)}>OKOKOK</button>
      <div>
        <div className="border p-1">
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
            id={textColorId}
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
            onClick={() => formatDoc('underline')}
          >
            <Tooltip title="Font size">
              <FormatSizeIcon/>
            </Tooltip>
          </button>
        </div>
        <div
          className="border min-h-60"
          contentEditable={true}
        ></div>
      </div>
		</div>
	)
}