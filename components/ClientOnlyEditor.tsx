"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Load ReactQuill dynamically (client-only)
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const ClientOnlyEditor = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <p>Loading editor...</p>;
  }

  return <ReactQuill theme="snow" value={value} onChange={onChange} />;
};

export default ClientOnlyEditor;
