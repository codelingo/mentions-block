import React, { useState } from "react";
import { TeamWithMembers } from "../../model/auth";
import { FocusPoint } from "../../model/notebook-dom";
import { CommandPalette } from "../CommandPalette/CommandPalette";
import { useCommandPaletteState } from "../CommandPaletteAPI/command-palette-state";
import { MentionsPopover } from "../MentionsPopover";
import { NodeFocus } from "../NodeFocus/NodeFocus";
import { TextEditor } from "../TextEditor";

export interface MentionsEditorProps {
  children: JSX.Element;
  team: TeamWithMembers | undefined;
}

function MentionsEditor(props: MentionsEditorProps) {
  const palette = useCommandPaletteState();
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("R");

  function handleChangeText(prevText: string, text: string) {
    const textWasBlank = prevText === "";

    if (textWasBlank && text.startsWith("@") && !text.includes(" ")) {
      handleOpen();
    }
  }

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleSetText(text: string) {
    setText(text);
  }

  function handleSetMention(userText: string) {
    console.log("userText", userText);
    handleSetText("@" + userText);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>, text: string) {
    if (e.key === "Enter") {
      console.log("Enter key");
      //e.preventDefault();
      //e.stopPropagation();
    }
  }

  const focus: FocusPoint = {
    nodeID: undefined,
    cursorPosition: "end",
    apply: true
  };

  return (
    <MentionsPopover
      team={props.team}
      isOpen={isOpen}
      handleClose={handleClose}
      handleSetText={handleSetMention}
    >
      <NodeFocus nodeID={"01"} nodeType={"p"} className={""}>
        <TextEditor
          id="01"
          text={text}
          className="placeholder-opacity-50"
          updateVersion={0}
          tag="undefined"
          focus={focus}
          selection="undefined"
          onChange={handleChangeText}
          onSelect={() => {
            console.log("onSelect");
          }}
          onFocusApplied={() => {
            console.log("onFocusApplied");
          }}
          onKeyDown={handleKeyDown}
          onSetText={handleSetText}
        ></TextEditor>
      </NodeFocus>
    </MentionsPopover>
  );
}

export default MentionsEditor;
