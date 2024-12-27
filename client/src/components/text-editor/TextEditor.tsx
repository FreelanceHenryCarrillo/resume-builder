import {
  useEditor,
  EditorContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "../toolbar/Toolbar";

type props = {
  onChange: (newContent: string) => void;
  content: string;
};

const Tiptap = ({ onChange, content }: props) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "w-full h-[200px] border-2 border-black p-4",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <>
      <Toolbar editor={editor} content={content ?? ''} />
      <EditorContent editor={editor} style={{ whiteSpace: "pre-line" }} value={content ?? ''}/>
    </>
  );
};

export default Tiptap;
