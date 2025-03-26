import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css"; // Ensure this is importing index.css

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex space-x-4">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="w-16 h-16" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="w-16 h-16" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-blue-600 mt-4">Vite + React</h1>
      <div className="mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="text-gray-700 mt-2">
          Edit <code className="bg-gray-200 px-1">src/App.tsx</code> and save to test HMR.
        </p>
      </div>
      <p className="text-gray-500 mt-4">Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;
