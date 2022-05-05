import MediumEditor from "medium-editor";

export const InlineAnchorEditExtension = (MediumEditor as any).Extension.extend({
  name: "inline-anchor-edit",

  init: function () {
    this.attachToEditables();
  },

  attachToEditables: function () {
    // this.subscribe("editableMouseover", () => console.log("boo"));
    // this.subscribe("editableKeypress", () => console.log("key"));
    // this.subscribe("positionToolbar", () => console.log("rah!"));
  },
});
