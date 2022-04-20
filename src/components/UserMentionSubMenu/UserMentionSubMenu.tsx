import React, { useContext } from "react";
import { TeamWithMembers, User } from "../../model/auth";
import { MentionNode } from "../../model/notebook-dom";
import { CommandPaletteAPI } from "../CommandPaletteAPI/command-palette-state";
import { SubMenu } from "../SubMenu/SubMenu";

export type UserMentionSubMenuProps<T> = { 
  palette: CommandPaletteAPI; 
  //node: MentionNode; 
  onConfirmed: () => void | undefined;
  team: TeamWithMembers | undefined; 
};

const UserMentionSubMenu = <T,>({ palette, /*node,*/ onConfirmed, team}: UserMentionSubMenuProps<T>) =>  {  
  function handleItemConfirmed(user: User) {
      console.log("handleItemConfirmed");

    //return dispatch(changeToMentionNodeThunk(node.id, user, backendAPI));
  }
  
  return (
    <SubMenu
      placeholder="Select a user..."
      items={team?.members ?? []}
      itemRenderer={(item) => (
        <>
          <label className="flex-1 text-white text-sm">{item.displayName}</label>
          <div className="text-gray-500">
            <i>{item.email}</i>
          </div>
        </>
      )}
      itemToFilterString={makeFilterString}
      itemToKey={makeLanguageKey}
      onConfirmed={handleItemConfirmed}
      palette={palette}
    />
  );
}
  
function makeLanguageKey(item: User): string {
    return item.id;
}
  
function makeFilterString(item: User): string {
    return `${item.displayName}|${item.email}`.toLowerCase();
}

export default UserMentionSubMenu;
