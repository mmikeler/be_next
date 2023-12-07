import { Icon } from "@/src/c/ui/icon";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $getNodeByKey
} from "lexical";
import {
  $isParentElementRTL,
  $wrapNodes,
  $setBlocksType,
  $isAtNodeEnd
} from "@lexical/selection";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode
} from "@lexical/list";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode
} from "@lexical/rich-text";
import {
  $createCodeNode,
  $isCodeNode,
  getDefaultCodeLanguage,
  getCodeLanguages
} from "@lexical/code";

export function BlockOptionsDropdownList({
  editor,
  blockType,
  toolbarRef,
  setShowBlockOptionsDropDown
}) {
  const dropDownRef = useRef(null);

  useEffect(() => {
    const dropDown = dropDownRef.current;
    const toolbar = toolbarRef.current;

    if (dropDown !== null && toolbar !== null) {
      const handle = (event) => {
        const target = event.target;

        if (!dropDown.contains(target) && !toolbar.contains(target)) {
          setShowBlockOptionsDropDown(false);
        }
      };
      document.addEventListener("click", handle);

      return () => {
        document.removeEventListener("click", handle);
      };
    }
  }, [dropDownRef, setShowBlockOptionsDropDown, toolbarRef]);

  const formatParagraph = () => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createParagraphNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatHeading = (tag) => {
    if (blockType !== tag) {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(tag));
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatBulletList = () => {
    if (blockType !== "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND);
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatNumberedList = () => {
    if (blockType !== "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND);
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createQuoteNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  return (
    <div className="text-2xl absolute bg-sky-700 text-white top-full mt-1 p-2 rounded flex flex-col" ref={dropDownRef}>
      <button className="item relative" onClick={formatParagraph}>
        <Icon tag="format_paragraph" />
        {blockType === "paragraph" && <Marker />}
      </button>
      <button className="item" onClick={() => formatHeading('h1')}>
        <Icon tag="format_h1" />
        {blockType === "h1" && <Marker />}
      </button>
      <button className="item" onClick={() => formatHeading('h2')}>
        <Icon tag="format_h2" />
        {blockType === "h2" && <Marker />}
      </button>
      <button className="item" onClick={() => formatHeading('h3')}>
        <Icon tag="format_h3" />
        {blockType === "h3" && <Marker />}
      </button>
      <button className="item" onClick={formatBulletList}>
        <Icon tag="format_list_bulleted" />
        {blockType === "list_bulleted" && <Marker />}
      </button>
      <button className="item" onClick={formatNumberedList}>
        <Icon tag="format_list_numbered" />
        {blockType === "list_numbered" && <Marker />}
      </button>
      <button className="item" onClick={formatQuote}>
        <Icon tag="format_quote" />
        {blockType === "quote" && <Marker />}
      </button>
      {/* <button className="item" onClick={formatCode}>
        <Icon tag="code" />
        {blockType === "code" && <Marker />}
      </button> */}
    </div>
  );
}

function Marker() {
  return (
    <Icon className="w-2 h-2 absolute right-0 top-0" tag="arrow_left" />
  )
}