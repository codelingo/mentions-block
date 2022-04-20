import { NodeID, User, UserID } from "./auth";


export type Timestamp = number;

export interface CreatedTimestamp {
  readonly createdBy: UserID;
  readonly createdAt: Timestamp;
}

export type DirtyState = "inserted" | "updated" | "deleted";
export type IntegrationType = "slack";

export enum Origins {
    UNKNOWN = "unknown",
    INSTALLATION = "install",
    ADD_TO_NOTEBOOK = "add",
    OPEN_NOTEBOOK = "open",
    SHARE_SNIPPET = "share",
    WEB_EDITOR = "web",
    STUCK_DUCK = "stuckduck",
    NOTEBOOKS_HOME = "home",
    SIGN_UP = "signup",
    REMOTE_REFERENCE = "remote-ref",
    DIFF_CAPTURE = "diff-capture",
}





export interface NodeMetadata extends CreatedTimestamp {
    readonly updatedBy: UserID;
    readonly updatedAt: Timestamp;
    readonly origin: Origins;
    readonly dirty?: DirtyState; // client-side only
    readonly updateVersion?: number; // client-side only: used to force updates
}

export interface NodeCommon {
    readonly id: NodeID;
    readonly metadata: NodeMetadata;
    //readonly chatID?: ChatID | null;
}

export interface MentionNode extends NodeCommon {
    readonly type: "mention";
    readonly mentionedUser: User;
    readonly notificationSentAt?: Timestamp;
}