import React, { useEffect, useLayoutEffect } from "react";
import "./styles/message.min.css";

function Message() {

  useEffect(() => {
  }, []);

  return (
    <div>
      <div className="blur"></div>
      <div className="mobile-message">
        <h1>Welcome to the Atlas of Migration</h1>
        <p>Unfortunatly, this application is only available on desktop.</p>
      </div>
    </div>
  );
}

export default Message;
