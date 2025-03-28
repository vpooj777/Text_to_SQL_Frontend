import "./index.css";
import Sidebar from "./components/sidebar/sidebar";
import ChatUI from "./components/chat/ChatUI";

export default function App() {
  return (
    <div className="h-screen flex bg-gray-100">
      <Sidebar />
      <ChatUI />
    </div>
  );
}
