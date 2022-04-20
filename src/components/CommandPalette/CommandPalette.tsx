import React, { forwardRef, Ref, useEffect } from "react";
import { Popover, PopoverPosition } from "@codelingo/react-tiny-popover"

import { CommandPaletteAPI } from "../CommandPaletteAPI/command-palette-state";
import UserMentionSubMenu from "../UserMentionSubMenu";

export type CommandPaletteProps = {
    children: JSX.Element;
    //node: NotebookNode;
    palette: CommandPaletteAPI;
    //exec: CommandExecutor;
};

export const CommandPalette = forwardRef((props: CommandPaletteProps, ref: Ref<HTMLElement>) => {
    const { children, palette } = props;

    function renderMenu() {
      // prettier-ignore
      return <UserMentionSubMenu palette={palette} team={undefined} />;
    }

    function getMenuPosition(): Exclude<PopoverPosition, "custom"> {
      // prettier-ignore
      return "bottom"
    }

    return (
      <Popover
        isOpen={palette.open}
        onClickOutside={palette.hide}
        containerClassName="z-50"
        content={renderMenu()}
        align={"start"}
        positions={[getMenuPosition()]}
        ref={ref}
      >
        {children}
      </Popover>
    );
});

export function useCommandPaletteClaimKeyboard(palette: CommandPaletteAPI) {
    //const dispatch = useThunkDispatch();
  
    useEffect(() => {
      if (!palette.open) return;
  
      function handleCommandPaletteKeyDown(e: React.KeyboardEvent<HTMLElement>) {
        if (e.key === "Escape") {
          e.stopPropagation();
          e.preventDefault();
  
          palette.hide();
        }
      }
  
      window.addEventListener("keydown", handleCommandPaletteKeyDown as any);
      //dispatch({ type: "i6t-set-keyboard-claimed", claimant: node.id });
  
      return () => {
        //dispatch({ type: "i6t-set-keyboard-claimed", claimant: undefined });
        window.removeEventListener("keydown", handleCommandPaletteKeyDown as any);
      };
    }, [palette.open]);
}