import React from 'react';
import { motion } from 'framer-motion';

const Cursor = ({ name, color, x, y }) => {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        x,
        y,
        pointerEvents: 'none',
        zIndex: 50,
      }}
      initial={false}
      animate={{ x, y }}
      transition={{
        type: 'spring',
        damping: 30,
        mass: 0.8,
        stiffness: 350,
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: color }}
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill="currentColor"
          stroke="white"
          strokeWidth="1"
        />
      </svg>
      <div
        className="ml-4 mt-2 px-2 py-1 rounded-md text-xs font-semibold text-white whitespace-nowrap shadow-lg"
        style={{ backgroundColor: color }}
      >
        {name}
      </div>
    </motion.div>
  );
};

export default Cursor;
