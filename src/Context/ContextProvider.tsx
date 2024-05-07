import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface ContextType {
  prevPrompts: string[];
  setPrevPrompts: Dispatch<SetStateAction<string[]>>;
  onSent: (prompt?: string) => Promise<void>;
  setRecentPrompt: Dispatch<SetStateAction<string>>;
  recentPrompt: string;
  showResult: boolean;
  loading: boolean;
  resultData: string;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  newChat: () => void;
}

export const Context = createContext<ContextType | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [prevPrompts, setPrevPrompts] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [recentPrompt, setRecentPrompt] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultData, setResultData] = useState<string>("");

  const onSent = async (prompt?: string) => {
    const currentPrompt = prompt ?? input; // Use the provided prompt or the current input
    setLoading(true);
    setShowResult(true);
    // Simulate API call delay
    setTimeout(() => {
      const simulatedResponse = `Response to: ${currentPrompt}`;
      setRecentPrompt(currentPrompt);
      setResultData(simulatedResponse);
      setPrevPrompts(prev => [...prev, currentPrompt]); // Save the current prompt to history
      setLoading(false);
      setInput(""); // Clear input after saving to history
    }, 1000);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setInput("");
    setResultData("");
    setRecentPrompt("");
    // Optionally clear the previous prompts history when starting a new chat
    // setPrevPrompts([]); // Uncomment this line if you want to clear the history on new chat
  };

  const contextValue: ContextType = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;