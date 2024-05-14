import React, { useContext, useRef, useEffect, FC } from "react"; // Corrected imports
import "./Chat.css";
import { assets } from "../../assets/ChatAssets/assets";
import { Context } from "../../Context/ContextProvider";

const Chat: FC = () => {
  const context = useContext(Context);
  // Specify the type as HTMLDivElement to inform TypeScript about the type of DOM element
  const greetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the greeting element when the component mounts
    if (greetRef.current) {
      greetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []); // Empty dependency array ensures this runs once on mount

  if (!context)
    throw new Error(
      "Context is undefined, make sure you're within a ContextProvider."
    );

  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = context;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Properly typed event
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSent();
    }
  };

  return (
    <div className="main">
      <div className="main-container">
        {showResult ? (
          <div className="result">
            <div className="result-title user-message">
              <img src={assets.userIcon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data bot-response">
              {loading ? (
                <div className="loader">
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
              <img src={assets.newrobot} alt="" />
            </div>
          </div>
        ) : (
          <div className="greet" ref={greetRef}>
            {" "}
            {/* Attach the ref here */}
            <p>
              <span>Velkommen til SmartPack!</span>
            </p>
            <p>Hvordan kan jeg hjelpe deg?</p>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              value={input}
              type="text"
              placeholder="Skriv inn her..."
            />
            <div>
              <img src={assets.gallery_icon} width={30} alt="" />
              <img src={assets.mic_icon} width={30} alt="" />
              {input ? (
                <img
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  width={30}
                  alt=""
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            SmartPack kan gjøre feil. Vennligst dobbelsjekk informasjon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
