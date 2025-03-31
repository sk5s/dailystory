import { Editable, useEditor } from "@wysimark/react"
export const MdEditor = ({
  markdown,
  setMarkdown
}:{
  markdown: string;
  setMarkdown: (e:string) => void;
}) => {
  const editor = useEditor({ minHeight: "400px" })
  return <Editable editor={editor} value={markdown} onChange={setMarkdown} />
}