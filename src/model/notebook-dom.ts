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

export type HeadingNode = H1Node | H2Node | H3Node | H4Node;
export type TextualNode = HeadingNode | ParagraphNode;

export type NotebookNode =
  | TextualNode
  | MentionNode;

  export interface NodeCommon {
    readonly id: NodeID;
    readonly metadata: NodeMetadata;
    //readonly chatID?: ChatID | null;
  }
  
  interface TextNodeCommon extends NodeCommon {
    readonly text: string;
    //readonly mentions?: Mention[]; // Currently only used in p nodes
  } 

  export interface H1Node extends TextNodeCommon {
    readonly type: "h1";
  }
  export interface H2Node extends TextNodeCommon {
    readonly type: "h2";
  }
  export interface H3Node extends TextNodeCommon {
    readonly type: "h3";
  }
  export interface H4Node extends TextNodeCommon {
    readonly type: "h4";
  }
  export interface ParagraphNode extends TextNodeCommon {
    readonly type: "p";
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

export type NotebookRange = {
    readonly anchorID: NodeID | undefined;
    readonly activeID: NodeID | undefined;
};
  

export interface NotebookSelection extends NotebookRange {
    readonly confirmed: boolean;
    readonly originalFocusPoint: FocusPoint | undefined;
}

export interface FocusPoint {
    readonly nodeID: NodeID | undefined;
    readonly cursorPosition: CursorPosition;
    readonly apply: boolean;
}

  export type CursorPosition = "start" | "end" | "custom" | number | undefined;