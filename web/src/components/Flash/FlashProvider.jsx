import React, { useState } from "react";
import FlashMessage from "./FlashMessage";

export const FlashContext = React.createContext({
  message: null,
  add: message => {},
  remove: () => {}
});

export default function FlashProvider({ children }) {
  const [message, setMessage] = useState(null);

  function add({ level = "Default", message }) {
    const newMessage = { level, message };
    setMessage(newMessage);
  }

  function remove() {
    setMessage(null);
  }

  const value = {
    message,
    add,
    remove
  };

  return (
    <FlashContext.Provider value={value}>
      {children}
      <FlashMessage />
    </FlashContext.Provider>
  );
}
