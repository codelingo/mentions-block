import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Input from "./UserMentionSubMenu";
import { TeamWithMembers, User } from "../../model/auth";
import UserMentionSubMenu from "./UserMentionSubMenu";
import { useCommandPaletteState } from "../CommandPaletteAPI/command-palette-state";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/UserMentionSubMenu",
  component: UserMentionSubMenu,
} as ComponentMeta<typeof UserMentionSubMenu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UserMentionSubMenu> = (args) => <UserMentionSubMenu {...args} />;

export type SimpleSubMenuState = { type: "code-block" | "notebook-link" | "heading" | "users" };
export type SubMenuState = SimpleSubMenuState;

interface CommandPaletteState {
    readonly open: boolean;
    readonly filter: string;
    readonly selectedIndex: number;
    readonly subMenu: SubMenuState | undefined;
  }

const PALETTE_INITIAL_STATE: CommandPaletteState = {
    open: false,
    filter: "",
    selectedIndex: 0,
    subMenu: undefined,
};

//const palette = useCommandPaletteState();


const members: User[] = [
  {
    aliases: ["quinn@mail.com", "q@mail.com"],
    avatarURL: "https://lh3.googleusercontent.com/a/AATXAJwW3H3GOqwmkR5406A2WcnBevHvf9OU4eqFXNbq=s96-c",
    displayName: "Quinn Dumala",
    email: "quinn@codelingo.io",
    id: "5iU9eUhsAzTLuETuLoh12G0ITrp2"
  },
  {
    aliases: ["christiana@codelingo.io", "73814210+christianagimenez@users.noreply.github.com"],
    avatarURL: "https://lh3.googleusercontent.com/a/AATXAJzi0_7xb8Gbl9yrNkqRRDLzfUWetLgL9qQA9yBs=s96-c",
    displayName: "christiana Gimenez",
    email: "christiana@codelingo.io",
    id: "fIZxf16rIbZVEV9YFCDhk2PVJXk1"
  }
]


const team: TeamWithMembers = {
  id: "1",
  name: "test",
  members: members,
  owner: "02"
};

//const palette = useCommandPaletteState();

export const Menu = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Menu.args = {
    //palette: palette,
    team: team
};
