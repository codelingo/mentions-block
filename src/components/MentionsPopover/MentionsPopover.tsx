import React, { forwardRef, Ref, useState } from "react";
import { Popover } from "@codelingo/react-tiny-popover";
import UserMentionSubMenu, {
  UserMentionSubMenuProps
} from "../UserMentionSubMenu/UserMentionSubMenu";
import { TeamWithMembers } from "../../model/auth";

export interface MentionsPopoverProps {
  children: JSX.Element;
  team: TeamWithMembers | undefined;
  isOpen: boolean;
  handleClose: () => void;
  handleSetText: (userText: string) => void;
}
const MentionsPopover = forwardRef(
  (props: MentionsPopoverProps, ref: Ref<HTMLElement>) => {
    const [isOpen, setIsOpen] = useState(true);
    const [selected, setSelected] = useState("");

    const onClose = () => {
      // setIsOpen(false);
      props.handleClose();
    };

    const onSelect = (user: string) => {
      // setSelected(user);
      props.handleSetText(user);
    };

    return selected ? (
      <p>
        <a href=";">@{selected}</a>
      </p>
    ) : (
      <Popover
        isOpen={props.isOpen}
        content={() => (
          <UserMentionSubMenu
            team={props.team}
            onClose={onClose}
            onConfirmed={onSelect}
          />
        )}
        align={"start"}
        positions={["bottom"]}
        onClickOutside={onClose}
        containerClassName="z-50"
        ref={ref}
      >
        {props.children}
      </Popover>
    );
  }
);
// (props: MentionsPopoverProps) => {
//   const [isOpen, setIsOpen] = useState(true);

//   const onClose = () => {
//     setIsOpen(false);
//   };

//   return (
//     <Popover
//       isOpen={isOpen}
//       content={() => <UserMentionSubMenu team={props.team} onClose={onClose} />}
//       align={"start"}
//       positions={["bottom"]}
//       onClickOutside={onClose}
//       containerClassName="z-50"
//       ref={ref}
//     >
//       <p></p>
//     </Popover>
//   );
// };

export default MentionsPopover;
