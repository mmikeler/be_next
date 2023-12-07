import { Icon } from "@/src/c/ui/icon";
import { useCallback, useEffect, useRef, useState } from "react";
import { BlockOptionsDropdownList } from "./selected_node";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, SELECTION_CHANGE_COMMAND } from "lexical";
import { $patchStyleText, getStyleObjectFromCSS } from "@lexical/selection";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { createPortal } from "react-dom";
import { getSelectedNode } from "./toolbar";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";

const LowPriority = 1;

/**
 * 
 * @param props blockType : string, toolbarRef : NodeElement
 * @returns select with block types
 */
export function FormatToggle(props: any) {
  const [editor] = useLexicalComposerContext();
  const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] = useState(false);
  const blockType = props.blockType;
  let i = "format_" + blockType;

  if (blockType === 'ul') i = "format_list_bulleted";
  if (blockType === 'ol') i = "format_list_numbered";

  return (
    <div className="relative">
      <button
        className="toolbar-item block-controls"
        onClick={() =>
          setShowBlockOptionsDropDown(!showBlockOptionsDropDown)
        }
        aria-label="Formatting Options"
      >
        <Icon className="text-xl" tag={i} />
        <Icon tag="expand_more" />
      </button>
      {showBlockOptionsDropDown &&
        <BlockOptionsDropdownList
          editor={editor}
          blockType={blockType}
          toolbarRef={props.toolbarRef}
          setShowBlockOptionsDropDown={setShowBlockOptionsDropDown}
        />
      }
    </div>
  )
}

/**
 * 
 * @param props
 * @returns colorpicker
 */
export function TextColorpicker(props: any) {
  const [editor] = useLexicalComposerContext();
  const [show, setShow] = useState(false);
  const [color, setColor] = useState('#555555');

  useEffect(() => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        const style = getStyleObjectFromCSS(`color: ${color}`);
        $patchStyleText(selection, style);
      }
    });
  }, [editor, color])

  return (
    <div className="relative">
      <button
        className="toolbar-item block-controls"
        onClick={() => setShow(!show)}
        aria-label="Formatting Options"
      >
        <Icon className="text-xl" tag={"format_color_text"} />
      </button>
      {show &&
        <>
          <label htmlFor="text_colorpicker"></label>
          <input
            onChange={(e) => setColor(e.target.value)}
            type="color" defaultValue={color} />
        </>
      }
    </div>
  )
}

/**
 * 
 * @param props
 * @returns Link
 */
export function LinkEditor(props: any) {
  const [editor] = useLexicalComposerContext();
  const [show, setShow] = useState(false);
  let position: any = document.getElementById('minipanel-subpanel')?.offsetLeft;

  const insertLink = useCallback(() => {
    const selection: any = $getSelection();

    if ($isRangeSelection(selection)) {
      if (!props.isLink) {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
      } else {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
      }
    }
  }, [props, editor]);

  useEffect(() => {
    if (show) {
      editor.getEditorState().read(() => {
        insertLink();
      });
    }
  }, [show]);

  return (
    <>
      <button
        id="link_editor_widget"
        onClick={() => setShow(!show)}
        className={"relative toolbar-item spaced " + (props.isLink ? "active" : "")}
        aria-label="Insert Link"
      >
        <Icon tag="link" />
        {(props.isLink || show) ?
          <div
            style={{ left: position }}
            className="absolute top-full w-[360px] text-slate-700">
            <FloatingLinkEditor editor={editor} />
          </div>
          : null}
      </button>
    </>
  )

}

function FloatingLinkEditor({ editor }: { editor: any }) {
  const editorRef = useRef(null);
  const inputRef: any = useRef(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [isEditMode, setEditMode] = useState(false);

  const updateLinkEditor = useCallback(() => {
    const selection: any = $getSelection();
    const editorElem = editorRef.current;

    if (editorElem === null) {
      return;
    }

    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();

      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL());
        setEditMode(true);
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
        setEditMode(true);
      } else {
        setLinkUrl("");
        setEditMode(false);
      }
    }

    return true;
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }: { editorState: any }) => {
        editorState.read(() => {
          updateLinkEditor();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor();
          return true;
        },
        LowPriority
      )
    );
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor();
    });
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <div ref={editorRef} className="link-editor">
      {isEditMode ? (
        <input
          ref={inputRef}
          className="link-input"
          value={linkUrl}
          onChange={(event) => {
            setLinkUrl(event.target.value);
          }}
          onBlur={() => {
            if (linkUrl !== "") {
              editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
            }
            setEditMode(false);
          }}
        />
      ) : null}
    </div>
  );
}