import ReactMarkdown from "react-markdown"
import { markdownRenderers } from "./../../utils/markdownRenderers"

const MessageContent = ({ content }) => {
  return (
    <div className="prose prose-sm max-w-none prose-headings:font-medium prose-p:text-gray-700 prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline">
      <ReactMarkdown components={markdownRenderers}>{content}</ReactMarkdown>
    </div>
  )
}

export default MessageContent

