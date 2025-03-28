import "./sidebar.css";
import { FiUpload, FiFileText, FiChevronLeft, FiMenu } from "react-icons/fi";
import { BiHistory } from "react-icons/bi";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onSelectChat: (chatId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, onSelectChat }) => {
  return (
    <div className={`sidebar ${isOpen ? "" : "collapsed"}`}>
      {/* Toggle Button */}
      <button onClick={toggleSidebar} className="toggle-btn">
        {isOpen ? <FiChevronLeft className="toggle-icon" /> : <FiMenu className="toggle-icon" />}
      </button>

      {/* Sidebar Content */}
      <div className="sidebar-content">
        {isOpen && (
          <>
            <div className="sidebar-section ddl-content">
              <label htmlFor="ddl-content" className="sidebar-label">
                <FiFileText className="icon" /> DDL Content
              </label>
              <textarea id="ddl-content" placeholder="Enter DDL content..."></textarea>
            </div>

            <div className="sidebar-section upload-section">
              <label htmlFor="ddl-file" className="sidebar-label">
                <FiUpload className="icon" /> Upload DDL File
              </label>
              <input type="file" id="ddl-file" className="file-input" />
            </div>

            <div className="sidebar-section chat-history">
              <h3><BiHistory className="icon" /> Chat History</h3>
              <div className="chat-history-list">
                <ul>
                  <li><button onClick={() => onSelectChat("Chat 1")}>Chat ID 1</button></li>
                  <li><button onClick={() => onSelectChat("Chat 2")}>Chat ID 2</button></li>
                  <li><button onClick={() => onSelectChat("Chat 3")}>Chat ID 3</button></li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
