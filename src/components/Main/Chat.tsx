import React, { useContext, useState, FC } from 'react';
import './Chat.css';
import { assets } from '../../assets/ChatAssets/assets';
import { Context } from '../../Context/ContextProvider';

const Chat: FC = () => { 
  const context = useContext(Context);
  if (!context) throw new Error("Context is undefined, make sure you're within a ContextProvider.");

  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = context;



  return (
    <div className='main'>
      <div className="nav">
        <p>SmartPack</p>
        
      </div>
      <div className="main-container">
        {showResult
          ? <div className="result">
            <div className='result-title'>
              <img src={assets.userIcon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.newrobot} alt="" />
              {loading
                ? <div className="loader">
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                </div>
                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              }
            </div>

          </div>
          : <>
            <div className="greet">
              <p><span>Velkommen til SmartPack!</span></p>
              <p>Hvordan kan jeg hjelpe deg?</p>
            </div>
          </>
        }



        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Skriv inn her...' />
            <div>
              <img src={assets.gallery_icon} width={30} alt="" />
              <img src={assets.mic_icon} width={30} alt="" />
              {input ? <img onClick={() => onSent()} src={assets.send_icon} width={30} alt="" /> : null}
            </div>
          </div>
          <p className="bottom-info">
            SmartPack kan gjøre feil. Vennligst dobbelsjekk informasjon.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Chat;