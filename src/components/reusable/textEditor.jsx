import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useGetTextEditor } from "../../store/textEditorStore";

function TextEditor(props) {
const {mode, data, bodyBerita} = props
  const [value, setValue] = useState("<p>Silahkan Memasukan Isi Berita</p>");
  const [text, setText] = useState("");
  // state isi berita
  const { isiBerita, setIsiBerita, removeIsi, modeText } = useGetTextEditor(
    (state) => state
  );
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };


  return (
    <div>
      <Editor
        apiKey="lqm747nmtdcyhvlipmbzaqfiarkjs5ej8ex4w5or8jia2g4w"
        onInit={(evt, editor) => {
          setText(editor.getContent({ format: "text" }));
          editorRef.current = editor;
        }}
        value={isiBerita}
        initialValue={modeText == "update" ? data : "silahkan memasukan isi berita"}
        onEditorChange={(newValue, editor) => {
          mode == 'tambah' || mode == 'update' ? setIsiBerita(newValue) : null
          setText(editor.getContent({ format: "text" }));
        }}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",  
        }}
      />
    </div>
  );
}

export default TextEditor;
