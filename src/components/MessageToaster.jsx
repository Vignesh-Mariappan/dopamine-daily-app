/* eslint-disable react/prop-types */
import React from "react";

const MessageToaster = ({ toastMessages, remove }) => {

  return (
    <div className="message-toaster-container">
      {
        toastMessages.map((currentMessage, index) => (
          <React.Fragment key={index}>
            {
              React.cloneElement(currentMessage, {
                index,
                remove
              })
            }
          </React.Fragment>
        ))
      }
    </div>
  )
}

export default MessageToaster;

