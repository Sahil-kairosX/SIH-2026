import React from "react";
import ReactDOM from "react-dom/client";

import "../style.css";

function App() {
    return (
        <div>
            {/* Your HTML interface will eventually go here */}
        </div>
    );
}

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);