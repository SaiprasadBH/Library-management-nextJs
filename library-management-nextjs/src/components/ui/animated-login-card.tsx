"use client";

import React from "react";
import { motion } from "framer-motion";

const AnimatedLoginCard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="rounded-2xl bg-gray-800/50 backdrop-blur-xl shadow-2xl p-8 space-y-8 border border-teal-500/20">
        {children}
      </div>
    </motion.div>
  );
};

export default AnimatedLoginCard;
