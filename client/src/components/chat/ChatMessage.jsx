import React from 'react';
import { markdownRenderers } from '../../utils/markdownRenderers';
import MessageContent from './MessageContent';
import LoadingIndicator from './LoadingIndicator';
import References from './References';

const ChatMessages = ({ messages, agent, isLoading, messagesEndRef }) => {
  if (!messages || !Array.isArray(messages)) {
    console.error("Messages is not an array:", messages);
    return <div className="flex-1 overflow-y-auto p-4">No messages to display</div>;
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {messages.map((message, index) => (
        <React.Fragment key={index}>
          <ChatMessage message={message} agent={agent} />
          
          {/* Show references if they exist and message is from assistant */}
          {message.role === 'assistant' && message.references && message.references.length > 0 && (
            <References references={message.references} />
          )}
        </React.Fragment>
      ))}
      
      {isLoading && agent && <LoadingIndicator agent={agent} />}
      
      {/* Reference for scrolling to bottom */}
      <div ref={messagesEndRef} />
    </div>
  );
};

const ChatMessage = ({ message, agent }) => {
  // Add a guard clause to prevent accessing properties of undefined
  if (!message) {
    return null; // Return nothing if message is undefined
  }

  const { role, content } = message;
  
  const isUser = role === 'user';
  const isAssistant = role === 'assistant';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && agent && (
        <div className="w-8 h-8 rounded-full mr-2 overflow-hidden flex-shrink-0">
          <img 
            src={agent.avatar} 
            alt={agent.name} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className={`max-w-[75%] rounded-lg p-4 ${
        isUser ? 'bg-blue-600 text-white rounded-tr-none' : 
        isAssistant ? 'bg-white border border-gray-200 rounded-tl-none' : 
        'bg-gray-100'
      }`}>
        {isAssistant ? (
          <MessageContent content={content} />
        ) : (
          <div className="prose prose-sm max-w-none text-white">
            {content}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessages;