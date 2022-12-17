import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider
    theme={extendTheme({
      fonts: {
        body: `'PT Sans', sans-serif`,
        heading: `'PT Sans', sans-serif`,
      },
      breakpoints: {
        sm: "320px",
        md: "1330px",
        lg: "1700px",
        xl: "1200px",
        "2xl": "1536px",
      },
    })}
  >
    <App />
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
