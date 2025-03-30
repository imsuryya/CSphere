import ReactMarkdown from 'react-markdown'
import { markdownRenderers } from './../../utils/markdownRenderers';

const MessageContent = ({ content }) => {
  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown components={markdownRenderers}>
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MessageContent