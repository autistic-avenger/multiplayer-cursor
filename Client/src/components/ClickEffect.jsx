import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ClickEffect = ({ clicks }) => {
  return (





    <AnimatePresence>
      {clicks.map((click) => (
        <motion.div
          key={click.id}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: 'absolute',
            left: click.x - 20,
            top: click.y - 20,
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: `2px solid ${click.color}`,
            pointerEvents: 'none',
            zIndex: 40,
          }}
        />
      ))}
    </AnimatePresence>
  );
};

export default ClickEffect;
