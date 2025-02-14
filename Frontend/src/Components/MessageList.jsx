const MessageList = ({ messages }) => {
    return (
      <div className="flex flex-col p-4 space-y-2 bg-gray-100 h-64 overflow-y-auto rounded-lg">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 bg-white rounded shadow-md">
            {msg}
          </div>
        ))}
      </div>
    );
  };

  export default MessageList;