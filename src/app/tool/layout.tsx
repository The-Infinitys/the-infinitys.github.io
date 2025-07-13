import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "The Infinity's Tools",
  description: "Useful tools for everyone!",
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="tool-layout">
      {children}
    </div>
  );
}
