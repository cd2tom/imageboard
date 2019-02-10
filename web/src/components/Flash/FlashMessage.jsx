import React, { useEffect, useContext, useRef } from "react";
import { FlashContext } from "./FlashProvider";

export default function FlashMessage() {
  const { message, remove } = useContext(FlashContext);
  const timeout = useRef(null);

  useEffect(
    function() {
      timeout.current = setTimeout(removeMessage, 3000);
      return removeTimeout;
    },
    [message]
  );

  function removeTimeout() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  function removeMessage() {
    removeTimeout();
    remove();
  }

  return (
    <div className="flashes">
      <div
        className={`flash ${
          message !== null ? `flash${message.level}` : "flashCollapse"
        }`}
      >
        {message !== null && (
          <React.Fragment>
            <div className="flashBody">{message.message}</div>
            <span className="flashClose" onClick={removeMessage}>
              x
            </span>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
