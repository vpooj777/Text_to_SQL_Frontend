import "./sidebar.css";
import { useState } from "react";
import { FiUpload, FiFileText, FiChevronLeft, FiMenu } from "react-icons/fi";
import { BiHistory } from "react-icons/bi";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`sidebar ${isOpen ? "" : "collapsed"}`}>
      {/* Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="toggle-btn">
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
                  <li><input type="checkbox" id="chat1" /><label htmlFor="chat1">Chat ID 1</label></li>
                  <li><input type="checkbox" id="chat2" /><label htmlFor="chat2">Chat ID 2</label></li>
                  <li><input type="checkbox" id="chat3" /><label htmlFor="chat3">Chat ID 3</label></li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
