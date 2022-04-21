import React, { useState } from "react";
import { Popover } from "@codelingo/react-tiny-popover";
import UserMentionSubMenu from "../UserMentionSubMenu";
import { UserMentionSubMenuProps } from "../UserMentionSubMenu/UserMentionSubMenu";
import { TeamWithMembers } from "../../model/auth";

export interface MentionsProps {
  label: string;
  isOpen: boolean;
  team: TeamWithMembers | undefined;
}

const Mentions = (props: MentionsProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Popover
      isOpen={isOpen}
      content={() => <UserMentionSubMenu team={props.team} onClose={onClose} />}
      align={"start"}
      positions={["bottom"]}
      onClickOutside={onClose}
    >
      <p></p>
    </Popover>
  );
};

export default Mentions;
