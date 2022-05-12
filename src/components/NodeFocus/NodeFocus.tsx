import React, {
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  Ref,
  RefObject
} from "react";
import { NodeID } from "../../model/auth";
import { NotebookNode } from "../../model/notebook-dom";

interface NodeFocusProps {
  nodeID: NodeID;
  nodeType: NotebookNode["type"];
  className: string;
  children: ReactNode;
  bottomSpacer?: true;
}

export const BUTTON_LEFT = 0;
export const BUTTON_MIDDLE = 1;

export const NodeFocus = React.forwardRef(
  (
    { nodeID, nodeType, className, children, bottomSpacer }: NodeFocusProps,
    ref: Ref<HTMLDivElement>
  ) => {
    //const [mouseDownCoords, setMouseDownCoords] = useState<Coords | undefined>(undefined);
    //const dispatch = useDispatch<RootDispatch>();
    //const services = useContext(ServicesContext);
    //const history = useHistory();
    //const selection = useSelector(notebookSelectors.selectionSelector);
    //const selectedNodeIDs = useSelector(notebookSelectors.selectedNodeIDs);
    //const isSelectingBlocks = useSelector(isSelectingBlocksSelector);
    //const blockStartNodeID = useSelector(blockStartNodeIDSelector);
    //const selected = selectedNodeIDs.has(nodeID);

    function handleCodeClick(e: MouseEvent<HTMLDivElement>) {
      // if (nodeType === "code/edit") {
      //   return;
      // }

      //dispatch({ type: "focus", nodeID, cursorPosition: "end", apply: false });
      const refElem = (ref as RefObject<HTMLDivElement>).current;
      if (refElem && refElem !== document.activeElement) {
        refElem.focus();
      }
    }

    function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
      // handleEditKeyDown({
      //   e,
      //   dispatch,
      //   node: { id: nodeID, type: nodeType },
      //   selection,
      //   services,
      //   cursor: undefined
      // });
    }

    function handleKeyUp(e: KeyboardEvent) {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
      }
    }

    // function handleMouseDown(e: MouseEvent<HTMLDivElement>) {
    //   // anchor handling
    //   if ((e.target as HTMLElement).nodeName === "A") {
    //     if (e.button === BUTTON_LEFT && (e.ctrlKey || e.metaKey)) {
    //       const anchor = e.target as HTMLAnchorElement;
    //       const href = anchor.attributes.getNamedItem("href")?.value!;
    //       const isRootRelativeURL = href.match(/^\//);
    //       if (isRootRelativeURL) {
    //         history.push(href);
    //       } else {
    //         window.open(anchor.href, "_blank");
    //       }
    //       e.preventDefault();
    //       e.stopPropagation();
    //       return;
    //     } else if (e.button === BUTTON_MIDDLE) {
    //       const anchor = e.target as HTMLAnchorElement;
    //       window.open(anchor.href, "_blank");
    //       e.preventDefault();
    //       e.stopPropagation();
    //       return;
    //     }
    //   }

    //   if (e.button !== BUTTON_LEFT) return;

    //   //setMouseDownCoords({ x: e.pageX, y: e.pageY });

    //   const handleMouseUp = (e: globalThis.MouseEvent) => {
    //     if (e.button !== BUTTON_LEFT) {
    //       return;
    //     }

    //     //setMouseDownCoords(undefined);

    //     document.removeEventListener("mouseup", handleMouseUp);

    //     // if (isSelectingBlocks) {
    //     //   setTimeout(() => {
    //     //     dispatch({ type: "selectConfirm" });
    //     //     dispatch({ type: "i6t-end-block-selection" });
    //     //   });
    //     // }
    //   };
    //   document.addEventListener("mouseup", handleMouseUp);
    // }

    // function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    //   if (!isSelectingBlocks) {
    //     if (!hasReachedSelectionThresholdDistance(mouseDownCoords, e)) {
    //       return;
    //     }

    //     dispatch({ type: "i6t-start-block-selection", startNodeID: nodeID });
    //   }
    // }

    function handleMouseEnter(e: MouseEvent<HTMLDivElement>) {
      // if (!isSelectingBlocks || !blockStartNodeID) {
      //   return;
      // }
      // if (blockStartNodeID !== nodeID) {
      //   e.preventDefault();
      //   e.stopPropagation();
      //   dispatch({
      //     type: "selectAlone",
      //     id: blockStartNodeID,
      //     confirmed: false
      //   });
      //   return dispatch({ type: "selectActive", id: nodeID, confirmed: false });
      // }
      // if (isSelectingBlocks) {
      //   dispatch({ type: "selectNone", confirmed: false });
      // }
    }

    // const selectedClass = selected ? "bg-blue-600 bg-opacity-50" : "";
    //const nestedSelectedClass = selected ? "opacity-75" : "";

    return (
      <>
        <div
          ref={ref}
          //className={`${selectedClass} ${className}`}
          onClick={handleCodeClick}
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          //onMouseDown={handleMouseDown}
          //onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
        >
          <div /* className={nestedSelectedClass}*/>{children}</div>
        </div>
        {bottomSpacer /*&& <div className={`${selectedClass} h-0.5`} />*/}
      </>
    );
  }
);
