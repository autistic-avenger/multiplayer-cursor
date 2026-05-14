import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UserList = ({ users, currentId }) => {
  const userArray = Object.values(users);

  return (
    <div className="fixed top-6 right-6 z-40 flex flex-col items-end gap-2">
      <div className="glass-panel rounded-2xl p-4 min-w-[180px]">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">
          Online Users ({userArray.length})
        </h3>
        <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence>
            {userArray.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div 
                  className="w-3 h-3 rounded-full shadow-sm" 
                  style={{ backgroundColor: user.color }}
                />
                <span className={`text-sm font-medium ${user.id === currentId ? 'text-indigo-300' : 'text-slate-200'}`}>
                  {user.name} {user.id === currentId && '(You)'}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default UserList;
