import React, { memo, useCallback, useEffect, useRef } from "react";
import EditorJS from "react-editor-js";
import { createReactEditorJS } from 'react-editor-js'
import Embed from '@editorjs/embed'
//import TOOLS from "./tools";
type EditorData = {
    time: number,
    blocks:[],
    version: string
}

const EditorComponent = ({initialData, editorId}:{initialData:EditorData, editorId: number}) => {
    const editorInstanceRef:any = useRef(null);

    const getData = useCallback(async () => {
        return await editorInstanceRef.current.save();
    }, []);

    const handleRef = useCallback((ref: any) => {
        editorInstanceRef.current = ref;
    }, []);

    const tools = {
        embed: Embed
    }

    return (
        <EditorJS
            instanceRef={handleRef}
            enableReInitialize
            data={initialData}
            holder={editorId}
            tools={tools}
        >
            <div id={String(editorId)} />
        </EditorJS>
    )
}

export default EditorComponent;