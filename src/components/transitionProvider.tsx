"use client";



import Navbar from "./Navbar";
import React, { ReactNode } from "react";

interface TransitionProviderProps {
  children: ReactNode;
}

const TransitionProvider: React.FC<TransitionProviderProps> = ({ children }) => {
  return (
    <>
      <div className="h-24 flex flex-col">
        <Navbar />
      </div>
      <div className="h-[calc(100vh-6rem)]">
        {children}
      </div>
     
    </>
  );
}

export default TransitionProvider;
