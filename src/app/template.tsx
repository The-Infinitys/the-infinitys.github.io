"use client";
import { motion } from "framer-motion";
import React from "react";
const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
};

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      className="site-wrapper"
      variants={variants}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }} // no means
      style={{
        minHeight: "100vh",
      }}
      transition={{
        type: "linear",
        duration: 2,
      }}
    >
      {children}
    </motion.main>
  );
}
