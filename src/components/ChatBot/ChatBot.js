import React, { useState } from 'react';

const ChatBot = () => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const chatBotStyle = {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    width: '300px',
    height: '400px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    overflow: 'hidden',
  };

  return (
    <div>
<button class="font-display text-sm font-medium whitespace-nowrap flex items-baseline hover:cursor-pointer hover:text-link-neutral-hover text-link-neutral" role="button"><span class="pr-1.5 self-center" role="img"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ms-ds-0 me-ds-0 mt-ds-0 mb-ds-0 stroke-ds-icon w-ds-icon-sm h-ds-icon-sm"><path d="M17.25 14.25H19.2522C20.3568 14.25 21.2522 13.3546 21.2522 12.25V5.75C21.2522 4.64543 20.3568 3.75 19.2522 3.75H9.0022C7.89763 3.75 7.0022 4.64543 7.0022 5.75V7.75M15.2522 7.75H4.7522C3.64763 7.75 2.7522 8.64543 2.7522 9.75V16.25C2.7522 17.3546 3.64763 18.25 4.7522 18.25H6.0022V20.75L10.5022 18.25H15.2522C16.3568 18.25 17.2522 17.3546 17.2522 16.25V9.75C17.2522 8.64543 16.3568 7.75 15.2522 7.75Z" stroke-linecap="round" stroke-linejoin="round" class="fill-transparent stroke-current"></path></svg></span>Chat with us</button>      {showChat && (
        <div style={chatBotStyle}>
          <iframe
            title="Web Messenger"
            frameBorder="0"
            allowFullScreen=""
            scrolling="no"
            style={{ width: '100%', height: '100%' }}
            srcDoc={`
              <!DOCTYPE html>
              <html>
                <head>
                  <link rel="stylesheet" href="https://cdn.smooch.io/frame.5.5.5.css" type="text/css" />
                  <script src="https://cdn.smooch.io/frame.5.5.5.min.js" async crossorigin="anonymous"></script>
                  <style>
                    /* Ajoutez ici des styles spécifiques au chatbot si nécessaire */
                    body {
                      margin: 0;
                    }
                  </style>
                </head>
                <body>
                  <div id="mount"></div>
                </body>
              </html>
            `}
            width="0"
            height="0"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
