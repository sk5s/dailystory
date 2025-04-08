import { Editable, useEditor } from "@wysimark/react"
export const MdEditor = ({
  markdown,
  setMarkdown,
  disabled
}:{
  markdown: string;
  setMarkdown: (e:string) => void;
  disabled: boolean;
}) => {
  const editor = useEditor({ minHeight: "400px" })
  return <div className="bg-white rounded"><Editable throttleInMs={0} editor={editor} value={markdown} onChange={(text) => {if (!disabled) setMarkdown(text)}} /></div>
}