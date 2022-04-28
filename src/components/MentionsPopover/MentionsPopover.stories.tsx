import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import MentionsPopover from "./MentionsPopover";
import { TeamWithMembers, User } from "../../model/auth";

export default {
  title: "ReactComponentLibrary/MentionsPopover",
  component: MentionsPopover
} as ComponentMeta<typeof MentionsPopover>;

const Template: ComponentStory<typeof MentionsPopover> = (args) => (
  <MentionsPopover {...args} />
);

const members: User[] = [
  {
    aliases: ["quinn@mail.com", "q@mail.com"],
    avatarURL:
      "https://lh3.googleusercontent.com/a/AATXAJwW3H3GOqwmkR5406A2WcnBevHvf9OU4eqFXNbq=s96-c",
    displayName: "Quinn Dumala",
    email: "quinn@codelingo.io",
    id: "5iU9eUhsAzTLuETuLoh12G0ITrp2"
  },
  {
    aliases: [
      "christiana@codelingo.io",
      "73814210+christianagimenez@users.noreply.github.com"
    ],
    avatarURL:
      "https://lh3.googleusercontent.com/a/AATXAJzi0_7xb8Gbl9yrNkqRRDLzfUWetLgL9qQA9yBs=s96-c",
    displayName: "christiana Gimenez",
    email: "christiana@codelingo.io",
    id: "fIZxf16rIbZVEV9YFCDhk2PVJXk1"
  }
];

const team: TeamWithMembers = {
  id: "1",
  name: "test",
  members: members,
  owner: "02"
};

export const HelloWorld = Template.bind({});
HelloWorld.args = {
  children: <p></p>,
  team: team
};
