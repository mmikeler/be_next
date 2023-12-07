
import useStore from "@/src/store/store"
import { useCallback, useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { debounce } from 'lodash';

type LocalStoragePluginProps = {
  namespace: string;
};

export function LocalStoragePlugin(props: any) {
  const [editor] = useLexicalComposerContext();
  const upd = useStore((state: any) => state.updateLayer_)
  const layer: any = props.layer

  // Отправка контента в стейт-менеджер и затем в бд
  const saveContent = useCallback(
    (content: string) => {
      if (layer.id) {
        upd(layer.id, {
          ...layer,
          innerHTML: content
        })
      }
    },
    []
  );

  // Задержка перед отправкой текста на сохранение
  const debouncedSaveContent = debounce(saveContent, 2000);

  // 
  useEffect(() => {
    return editor.registerUpdateListener(
      ({ editorState, dirtyElements, dirtyLeaves }) => {
        // Don't update if nothing changed
        if (dirtyElements.size === 0 && dirtyLeaves.size === 0) return;

        const serializedState = JSON.stringify(editorState);
        debouncedSaveContent(serializedState);
      }
    );
  }, [debouncedSaveContent, editor]);

  useEffect(() => {
    editor.setEditable(props.edit)
  }, [editor, props.edit])

  return null;
}