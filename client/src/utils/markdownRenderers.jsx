import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Custom renderers for markdown components
export const markdownRenderers = {
  code({ inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    
    if (!inline && match) {
      return (
        <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div" {...props}>
          {String(children).trim()}
        </SyntaxHighlighter>
      );
    }
    
    return (
      <code className={className ? className : ''} {...props}>
        {children}
      </code>
    );
  },
  p: ({ children }) => <p>{children}</p>,
  h1: ({ children }) => <h1>{children}</h1>,
  h2: ({ children }) => <h2>{children}</h2>,
  h3: ({ children }) => <h3>{children}</h3>,
  h4: ({ children }) => <h4>{children}</h4>,
  h5: ({ children }) => <h5>{children}</h5>,
  h6: ({ children }) => <h6>{children}</h6>,
  ul: ({ children }) => <ul>{children}</ul>,
  ol: ({ children }) => <ol>{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  blockquote: ({ children }) => <blockquote>{children}</blockquote>
};
