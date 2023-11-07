import React from "react";
// import  ReactDOM  from "react-dom";
import { createRoot } from "react-dom/client";
import App from '../components/App.jsx';

// ReactDOM.render(<App />, document.getElementById('root'));

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render (<App />);