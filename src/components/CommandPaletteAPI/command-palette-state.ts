import { useReducer } from "react";
//import type { CodeHighlightRange } from "../../../../../../common/src/model/notebook-dom";
//import { CommandPaletteCommand, COMMANDS } from "./CommandCodes";

interface CommandPaletteState {
  readonly open: boolean;
  readonly filter: string;
  readonly selectedIndex: number;
  readonly subMenu: SubMenuState | undefined;
}

export type SimpleSubMenuState = { type: "code-block" | "notebook-link" | "heading" | "users" };
// export type CodeSelectionSubMenuState = {
//   type: "code-selection";
//   ranges: CodeHighlightRange[];
//   isExistingHighlight: boolean;
// };
export type SubMenuState = SimpleSubMenuState //| CodeSelectionSubMenuState;

type CommandPaletteActions =
  | { type: "show"; filter: string }
  | { type: "hide" }
  | { type: "select"; index: number }
  | { type: "sub-menu"; subMenu: SubMenuState | undefined };

const PALETTE_INITIAL_STATE: CommandPaletteState = {
  open: false,
  filter: "",
  selectedIndex: 0,
  subMenu: undefined,
};

export type UseCommandPaletteStateServices = ReturnType<typeof useCommandPaletteState>;

export type CommandPaletteAPI = ReturnType<typeof useCommandPaletteState>;

export function useCommandPaletteState() {
  const [state, dispatch] = useReducer(
    (state: CommandPaletteState, action: CommandPaletteActions): CommandPaletteState => {
      // prettier-ignore
      switch (action.type) {
        case "show": return { ...state, open: true, filter: action.filter.toLowerCase() };
        case "hide": return { ...state, open: false, filter: "", selectedIndex: 0, subMenu: undefined };
        case "select": return { ...state, selectedIndex: action.index };
        case "sub-menu": return { ...state, subMenu: action.subMenu}
        default: return state;
      }
    },
    PALETTE_INITIAL_STATE
  );

//   const filteredCommands = state.filter
//     ? COMMANDS.filter(([_, label]) => label.toLowerCase().includes(state.filter))
//     : COMMANDS;


  return {
    ...state,

    //commands: filteredCommands,

    // get currentCommand(): CommandPaletteCommand | undefined {
    //   return this.commands[this.selectedIndex];
    // },

    show: (filter?: string) => dispatch({ type: "show", filter: filter ?? "" }),
    hide: () => dispatch({ type: "hide" }),
    changeSubMenu: (subMenu: SubMenuState) => dispatch({ type: "sub-menu", subMenu }),
    offset(delta: -1 | 1) {
      //const numFilteredCommands = this.commands.length;
      let newIndex = this.selectedIndex + delta;
      //if (newIndex < 0) newIndex = numFilteredCommands - 1;
      //if (newIndex >= numFilteredCommands) newIndex = 0;
      dispatch({ type: "select", index: newIndex });
    },

    // currentCommand,
  };
}
