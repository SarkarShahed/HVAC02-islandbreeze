import React, { useEffect, useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ErrorNotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  message,
  isVisible,
  onClose,
  duration = 5000,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (isVisible) {
      setProgress(100);
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(remaining);
        
        if (remaining === 0) {
          onClose();
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.95 }}
          className="fixed bottom-6 left-6 z-[9999] w-full max-w-[380px] pointer-events-auto"
        >
          <div className="relative overflow-hidden bg-[#121417] border border-white/10 rounded-2xl shadow-2xl">
            {/* Design System Fourth Color Accent Bar */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FE552F]" />
            
            <div className="p-4 pl-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FE552F]/10 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-[#FE552F]" />
              </div>
              
              <div className="flex-1 pt-0.5">
                <h4 className="text-sm font-['Nohemi'] font-bold text-white tracking-tight">
                  System Error Detected
                </h4>
                <p className="text-xs font-['Delight'] text-white/60 mt-1 leading-relaxed">
                  {message}
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Auto-hide Progress Bar */}
            <div className="absolute bottom-0 left-0 h-[2px] bg-[#FE552F]/30 w-full">
              <motion.div 
                className="h-full bg-[#FE552F]"
                initial={{ width: '100%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
