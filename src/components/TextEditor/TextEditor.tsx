import React, { KeyboardEvent } from "react";
import MediumEditor, { CoreOptions, selectionObject } from "medium-editor";
import { NodeID } from "../../model/auth";
import { FocusPoint, NotebookSelection } from "../../model/notebook-dom";
import { BUTTON_LIST } from "../edit/buttons";
import { NBPaste } from "../edit/medium-extensions/nb-paste";
import { InlineAnchorEditExtension } from "../edit/anchor";
import { NBAnchorPreview } from "../edit/medium-extensions/nb-anchor-preview";
import { inlineMarkdownToHTML, scrollIntoView } from "../util/dom";
import { MentionsPopover } from "../MentionsPopover";

const options = (): CoreOptions => ({
  autoLink: true,
  disableReturn: true, // disallow enter
  targetBlank: true, // links open in new tab
  anchorPreview: false,
  toolbar: {
    buttons: []
  },
  placeholder: false,
  extensions: {
    paste: new NBPaste(),
    "inline-anchor-edit": new InlineAnchorEditExtension(),
    "nb-anchor-preview": new NBAnchorPreview()
  }

  // extensions: {
  //   code: new CodeButton(),
  // },
});

export interface TextEditorProps {
  id: NodeID;
  text: string;
  updateVersion: number;
  tag: string;
  focus: FocusPoint | undefined;
  selection: NotebookSelection;
  contentEditable?: boolean;
  dangerouslySetInnerHTML?: { __html: string };
  className?: string;
  onChange(text: string): any;
  onSelect?(apply: boolean): any;
  onFocusApplied?(focus: FocusPoint): any;
  onKeyDown?(e: React.KeyboardEvent<HTMLElement>, text: string): any;
  onSetText(text: string): any;
  //dispatch: RootDispatch;
}

interface TextEditorState {
  text: string;
  updateVersion: number;
}

export default class TextEditor extends React.Component<any> {
  private medium: MediumEditor.MediumEditor | undefined;
  private elementRef: React.RefObject<HTMLElement>;
  private uncontrolledTextState: TextEditorState;

  constructor(props: TextEditorProps) {
    super(props);

    this.uncontrolledTextState = {
      updateVersion: props.updateVersion,
      text: props.text
    };

    this.elementRef = React.createRef();

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  handleKeyDown(e: KeyboardEvent<HTMLElement>) {
    this.props.onKeyDown?.(e, this.uncontrolledTextState.text);

    setTimeout(() => {
      this.props.onSetText(this.uncontrolledTextState.text);
      //this.checkFocus();
    });

    if (e.key === "Delete" || e.key === "Backspace") {
      // sometimes... handleInput doesn't fire, so this is a backup plan
      // to make sure that we don't lose the keystroke 😩
      setTimeout(() => {
        this.checkTextUpdated(e.target);
      });
    }
  }

  handleKeyUp(e: KeyboardEvent) {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  }

  handleInput(e: InputEvent) {
    this.checkTextUpdated(e.target);
  }

  private checkTextUpdated(eventTarget: EventTarget | null) {
    const targetElement =
      (eventTarget as HTMLElement) ?? this.element ?? undefined;
    const previousText = this.uncontrolledTextState.text;
    const nextText = targetElement?.innerHTML;

    if (nextText === undefined) {
      return;
    }

    if (previousText !== nextText) {
      this.uncontrolledTextState.updateVersion++;
      this.uncontrolledTextState.text = nextText;
      this.props.onChange(previousText, nextText);
      //this.onTextChange(previousText, nextText);
    }
  }

  handleFocus(e: Event) {
    if (this.props.onSelect && !this.props.focus) {
      this.props.onSelect(false);
    }
  }

  handleBlur(e: Event) {
    this.forceUpdate();
  }

  handlePaste(e: ClipboardEvent) {
    const clipboardText = e.clipboardData?.getData("text/plain");
    if (clipboardText) {
      //this.props.dispatch(pasteThunk(clipboardText, e, this.context));
    }
  }

  get element(): HTMLElement {
    return this.elementRef?.current!;
  }

  componentDidMount() {
    const element = this.element;
    if (element.nodeType !== Node.ELEMENT_NODE) {
      throw new Error("TextEditor must be mounted in an element");
    }

    this.medium = new MediumEditor(element, options());
    this.medium.subscribe("focus", this.handleFocus);
    this.medium.subscribe("blur", this.handleBlur);
    this.medium.subscribe("editableInput", this.handleInput);
    this.medium.subscribe("editableKeydown", this.handleKeyDown);
    this.medium.subscribe("editableKeyup", this.handleKeyUp);
    this.medium.subscribe("editablePaste", this.handlePaste);

    this.checkFocus();
  }

  componentDidUpdate() {
    //this.checkFocus();
  }

  shouldComponentUpdate(nextProps: TextEditorProps): boolean {
    const shouldUpdate =
      nextProps.updateVersion !== this.uncontrolledTextState.updateVersion;

    const isTextChange = this.uncontrolledTextState.text !== nextProps.text;

    if (shouldUpdate || isTextChange) {
      this.uncontrolledTextState = {
        text: nextProps.text,
        updateVersion: nextProps.updateVersion
      };

      if (this.medium && isTextChange) {
        const selection: selectionObject | null = this.medium.exportSelection();
        this.medium.setContent(nextProps.text);
        this.forceUpdate();
        if (selection) {
          setTimeout(() => this.medium!.importSelection(selection, true));
        }
      }
    }

    return shouldUpdate && isTextChange;
  }

  private checkFocus() {
    const medium = this.medium;
    if (!medium) {
      return;
    }

    if (this.props.focus) {
      //console.log("this.props.focus.apply", this.props.focus.apply);
      if (this.props.focus.apply) {
        TextEditor.applyFocus(this.element, this.props.focus, medium);

        if (this.props.onFocusApplied) {
          this.props.onFocusApplied(this.props.focus);
        }

        scrollIntoView(this.element);
      }
    }
  }

  private static applyFocus(
    element: HTMLElement,
    focus: FocusPoint,
    medium: MediumEditor.MediumEditor
  ) {
    const text = element.textContent ?? "";
    const { cursorPosition } = focus;

    if (cursorPosition === undefined) {
      return;
    }
    let pos = 0;
    switch (cursorPosition) {
      case "start":
        pos = 0;
        break;
      case "end":
        pos = text.length;
        break;
      case "custom":
        return; // should only be handled by embedded editors
      default:
        pos = cursorPosition;
        break;
    }
    setTimeout(() => {
      medium.importSelection(
        {
          start: pos,
          end: pos
        },
        true
      );
    });
  }

  onTextChange(prevText: string, text: string) {
    const textWasBlank = prevText === "";

    if (textWasBlank && text.startsWith("@") && !text.includes(" ")) {
      console.log("textWasBlank && text.startsWith @");
    }
  }

  render() {
    const tag = "p";

    const markdownHTML = inlineMarkdownToHTML(this.props.text);

    const elemProps = {
      tag,
      ref: this.elementRef,
      className: this.props.className,
      dangerouslySetInnerHTML: { __html: markdownHTML }
    };

    return React.createElement(tag, elemProps);
  }
}
