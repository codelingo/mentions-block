import React, { forwardRef, Ref, useState } from "react";
import { Popover } from "@codelingo/react-tiny-popover";
import UserMentionSubMenu, {
  UserMentionSubMenuProps
} from "../UserMentionSubMenu/UserMentionSubMenu";
import { TeamWithMembers } from "../../model/auth";

export interface MentionsPopoverProps {
  children: JSX.Element;
  label: string;
  isOpen: boolean;
  team: TeamWithMembers | undefined;
}

const MentionsPopover = forwardRef(
  (props: MentionsPopoverProps, ref: Ref<HTMLElement>) => {
    const [isOpen, setIsOpen] = useState(true);

    const onClose = () => {
      setIsOpen(false);
    };

    return (
      <Popover
        isOpen={isOpen}
        content={() => (
          <UserMentionSubMenu team={props.team} onClose={onClose} />
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
