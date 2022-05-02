import React, { useContext } from "react";
import { TeamWithMembers, User } from "../../model/auth";
import { MentionNode } from "../../model/notebook-dom";
import { CommandPaletteAPI } from "../CommandPaletteAPI/command-palette-state";
import { SubMenu } from "../SubMenu/SubMenu";

export type UserMentionSubMenuProps<T> = {
  palette?: CommandPaletteAPI | undefined;
  //node: MentionNode;
  onConfirmed: (user: string) => void;
  onClose: () => void;
  team: TeamWithMembers | undefined;
};

const UserMentionSubMenu = <T,>({
  palette,
  /*node,*/ onConfirmed,
  onClose,
  team
}: UserMentionSubMenuProps<T>) => {
  function handleItemConfirmed(user: User) {
    console.log("handleItemConfirmed");
    user.displayName && onConfirmed(user.displayName);

    //return dispatch(changeToMentionNodeThunk(node.id, user, backendAPI));
  }

  return (
    <SubMenu
      placeholder="Select a user..."
      items={team?.members ?? []}
      itemRenderer={(item) => (
        <>
          <label className="flex-1 text-white text-sm">
            {item.displayName}
          </label>
          <div className="text-gray-500">
            <i>{item.email}</i>
          </div>
        </>
      )}
      itemToFilterString={makeFilterString}
      itemToKey={makeLanguageKey}
      onConfirmed={handleItemConfirmed}
      onClose={onClose}
      palette={palette}
    />
  );
};

function makeLanguageKey(item: User): string {
  return item.id;
}

function makeFilterString(item: User): string {
  return `${item.displayName}|${item.email}`.toLowerCase();
}

export default UserMentionSubMenu;
