"use client";
import { motion } from "framer-motion";
import React from "react";
import { AnimatePresence } from "framer-motion";

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
};

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.main
        className="site-wrapper"
        variants={variants}
        initial="hidden"
        animate="enter"
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
    </AnimatePresence>
  );
}
