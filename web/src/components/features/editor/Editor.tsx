import { Editable, useEditor } from "@wysimark/react"
export const MdEditor = ({
  markdown,
  setMarkdown,
  disabled,
  placeholder
}:{
  markdown: string;
  setMarkdown: (e:string) => void;
  disabled: boolean;
  placeholder?: string;
}) => {
  const editor = useEditor({ minHeight: "400px" })
  return <div className="bg-white rounded"><Editable throttleInMs={0} editor={editor} value={markdown} placeholder={placeholder ? placeholder : ""} onChange={(text) => {if (!disabled) setMarkdown(text)}} /></div>
}