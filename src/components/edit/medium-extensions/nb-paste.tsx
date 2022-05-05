import MediumEditor from "medium-editor";

declare const _mediumEditors: MediumEditor.MediumEditor[];

type WithAPI<T> = MediumEditor.MediumEditorExtensionAPI & T;

interface PasteProps {
  cleanPastedHTML: boolean;
  handlePaste(this: WithAPI<this>, event: ClipboardEvent): void;
  handlePasteBinPaste(this: WithAPI<this>, event: ClipboardEvent): void;
}

type NBPasteType = WithAPI<MediumEditor.MediumEditorExtensionArgs<PasteProps>> &
  PasteProps;

export const NBPaste = MediumEditor.Extension.extend<PasteProps>({
  cleanPastedHTML: true,
  handlePaste: function (event: ClipboardEvent) {
    window.alert("handled!");
    (MediumEditor.extensions as any).paste.prototype.handlePaste.apply(
      this,
      arguments
    );
  },
  handlePasteBinPaste: function (event: ClipboardEvent) {
    window.alert("handled paste bin!");
    (MediumEditor.extensions as any).paste.prototype.handlePaste.apply(
      this,
      arguments
    );
  }
});
