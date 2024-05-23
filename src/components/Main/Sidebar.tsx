import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/ChatAssets/assets";
import { Context } from "../../Context/ContextProvider";

interface ContextValues {
  onSent: (prompt?: string) => Promise<void>;
  prevPrompts: string[];
  setRecentPrompt: (recentPrompt: string) => void;
  newChat: () => void;
}

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const context = useContext(Context);

  if (!context) {
    // Handle case when context is not available
    console.error("Context not available");
    return null; // or return an error message or loading indicator
  }

  const { onSent, prevPrompts, setRecentPrompt, newChat }: ContextValues =
    context;

  const loadPrompt = async (prompt: string): Promise<void> => {
    await onSent(prompt);
    setRecentPrompt(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          src={assets.menu_icon}
          alt=""
          className="menu"
          onClick={() => setExtended((prev) => !prev)}
        />
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>Ny samtale</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Nylige samtaler</p>
            {prevPrompts.map((item, index) => (
              <div
                key={index}
                onClick={() => loadPrompt(item)}
                className="recent-entry"
              >
                <img src={assets.message_icon} alt="" />
                <p>
                  {item.slice(0, 18)} {"..."}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <a href="/" className="bottom-item recent-entry">
          <img src={assets.hjem} alt="" />
          {extended ? <p>Hjem</p> : null}
        </a>
      </div>
    </div>
  );
};

export default Sidebar;