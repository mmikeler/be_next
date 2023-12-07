import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { LocalStoragePlugin } from './plugins/plugin';
import ToolbarPlugin from './plugins/toolbar/toolbar';
import { createPortal } from 'react-dom';
import maintheme from './plugins/themes/theme1';
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import useStore from '@/src/store/store';

interface myInitialConfigType extends InitialConfigType {
  editorState?: any
}

export function LexicalEditor(props: any) {

  return (
    <LexicalComposer initialConfig={props.config}>

      {
        createPortal(
          <ToolbarPlugin on={props.config.editable} />,
          document.getElementById('minipanel-subpanel') || document.body
        )
      }

      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<Placeholder />}
        ErrorBoundary={LexicalErrorBoundary}
      />

      {/* Another plugins */}
      <LinkPlugin />
      <ListPlugin />

      <LocalStoragePlugin layer={props.layer} edit={props.config.editable} />
    </LexicalComposer>
  );
}

const Placeholder = () => {
  return (
    <div className="absolute top-[1.125rem] left-[1.125rem] opacity-50">
      Start writing...
    </div>
  );
};

export function Editor(props: any) {
  const isLayerActive = useStore((state: any) => state.isLayerActive_(props.path))

  let config: myInitialConfigType = {
    editable: props.edit && props.data.layerType === 'texteditor' && isLayerActive,
    namespace: 'lexical-editor',
    theme: maintheme,
    onError: (error: any) => {
      console.log(error);
    },
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode
    ]
  };

  if (props.data.innerHTML && props.data.innerHTML !== '') {
    config.editorState = props.data.innerHTML;
  }

  return (
    <div
      id="editor-wrapper"
      className={
        `${props.edit ? 'editable' : ''} relative prose prose-slate prose-p:my-0 prose-headings:mb-4 prose-headings:mt-2`
      }
    >
      <LexicalEditor
        layer={props.data}
        config={config}
      />
    </div>
  );
}