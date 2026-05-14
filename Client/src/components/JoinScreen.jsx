import React, { useState } from 'react';
import { motion } from 'framer-motion';

const colors = [
  '#ef4444', '#f97316', '#f59e0b', '#10b981', 
  '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', 
  '#d946ef', '#f43f5e'
];

const JoinScreen = ({ onJoin }) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[Math.floor(Math.random() * colors.length)]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onJoin({ name, color: selectedColor });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="z-50 glass-panel p-8 rounded-3xl flex flex-col items-center gap-6 max-w-md w-full"
    >
      <h1 className="text-4xl font-outfit font-extrabold text-white tracking-tight">
        Multiplayer <span className="text-indigo-400">Cursors</span>
      </h1>
      
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-300 ml-1">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            autoFocus
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-300 ml-1">Pick a Color</label>
          <div className="flex flex-wrap gap-3 justify-center mt-1">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full transition-all transform hover:scale-110 ${
                  selectedColor === color ? 'ring-4 ring-white scale-110' : ''
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/25 mt-2"
        >
          Join Space
        </button>
      </form>
    </motion.div>
  );
};

export default JoinScreen;
