import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

serviceWorkerRegistration.register({
  onUpdate: registration => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    serviceWorkerRegistration.unregister();
    caches
      .keys()
      .then((keyList) => Promise.all(keyList.map((key) => caches.delete(key))));
    setTimeout(() => {
      console.log("Will be updated soon ...");
      window.location.reload(true);
    }, 3000);
  }
});