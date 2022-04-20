import { IntegrationType } from "./notebook-dom";

export type NodeID = string;
export type ClientID = "unknown" | string;
export type UserID = "*" | string;
export type TeamID = string;

export interface UserCore {
    readonly id: UserID;
    readonly displayName: string | null;
    readonly email: string | null;
    readonly avatarURL: string | null;
  }

export interface User extends UserCore {
    readonly aliases: string[] | null;
    readonly integrations?: IntegrationType[] | null;
}

export interface TeamWithMembers {
    readonly id: TeamID;
    readonly name: string;
    readonly members: User[];
    //readonly settings?: TeamSettings;
    readonly owner?: UserID;
  }