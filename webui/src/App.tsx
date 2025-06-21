import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useGetRoot } from "./services/useGetRoot";

function App() {
  const { data, loading, error } = useGetRoot();
  console.log('data', data);
  return (
    <>
      <div className="content">Content</div>
    </>
  );
}

export default App;
