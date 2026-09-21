import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import HvacPricingEstimator from './HvacPricingEstimator';
import {
  Calculator,
  Percent,
  Phone,
  PhoneCall,
  X,
  MessageCircle,
  ChevronRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

// Floating Finance Calculator Component (Apple Frosted Glass Style)
const FloatingFinanceModal: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const [amount, setAmount] = useState<number>(4500);
  const [months, setMonths] = useState<number>(48);

  const monthlyRate = 0.0999 / 12; // 9.99% APR promo rate
  const monthlyPayment = Math.round(
    (amount * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
      (Math.pow(1 + monthlyRate, months) - 1)
  );

  return (
    <div className="w-full bg-[#121417]/95 backdrop-blur-md text-white rounded-none shadow-2xl shadow-black/85 border border-white/20 overflow-hidden flex flex-col font-['Delight'] font-normal select-none transform-gpu">
      {/* Header */}
      <div className="bg-white/[0.04] text-white px-4 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-none bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-400/30">
            <Percent className="w-4 h-4" />
          </div>
          <span className="font-normal text-xs sm:text-[13px] tracking-tight text-white uppercase">
            0% APR Financing Calculator
          </span>
        </div>
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="w-6 h-6 rounded-none bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          title="Close"
        >
          <X className="w-3.5 h-3.5" />
        </motion.button>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Payment Highlight Box */}
        <div className="p-3.5 rounded-none bg-white/[0.08] border border-white/15 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
          <span className="font-normal text-[10px] uppercase tracking-wider text-white/60">
            Estimated Monthly Payment
          </span>
          <div className="font-normal text-3xl text-white tracking-tight mt-0.5">
            ${monthlyPayment}
            <span className="text-xs text-white/60 font-normal ml-1">/mo</span>
          </div>
          <div className="font-normal text-[11px] text-emerald-400 mt-0.5 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span>0% Interest for 12 Mos with Approved Credit</span>
          </div>
        </div>

        {/* Project Cost Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/80">Project Cost</span>
            <span className="text-white bg-white/10 px-2.5 py-0.5 rounded-none border border-white/15">
              ${amount.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min={1000}
            max={16000}
            step={250}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-1.5 bg-white/20 rounded-none appearance-none cursor-pointer accent-blue-400"
          />
        </div>

        {/* Term Selector */}
        <div className="space-y-1.5">
          <span className="text-xs text-white/80">Loan Term</span>
          <div className="grid grid-cols-4 gap-1.5">
            {[12, 24, 48, 60].map((m) => (
              <motion.button
                key={m}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setMonths(m)}
                className={`py-1.5 rounded-none border text-center text-xs transition-colors cursor-pointer ${
                  months === m
                    ? 'border-white/50 bg-white/20 text-white ring-1 ring-white/30 font-normal'
                    : 'border-white/10 bg-white/[0.05] text-white/80 hover:bg-white/10'
                }`}
              >
                {m} mos
              </motion.button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="pt-2">
          <motion.a
            href="#estimate"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            className="w-full h-[38px] flex items-center justify-center gap-2 px-3 rounded-none bg-blue-600 hover:bg-blue-500 text-white text-xs font-normal uppercase tracking-wider transition-colors cursor-pointer shadow-lg"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Apply For Pre-Approval</span>
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export const FloatingHvacWidget: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'estimator' | 'finance' | null>(null);
  const [isCallMenuOpen, setIsCallMenuOpen] = useState<boolean>(false);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [hoveredButton, setHoveredButton] = useState<'estimator' | 'finance' | 'call' | null>(null);

  const callMenuRef = useRef<HTMLDivElement>(null);

  // Auto 3-second timer on page load for initial expanded view
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLabels(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Listen to external custom event to open the estimator
  useEffect(() => {
    const handleOpenWidget = () => {
      setActiveModal('estimator');
    };
    window.addEventListener('open-hvac-estimator', handleOpenWidget);

    return () => {
      window.removeEventListener('open-hvac-estimator', handleOpenWidget);
    };
  }, []);

  // Close call popup on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (callMenuRef.current && !callMenuRef.current.contains(e.target as Node)) {
        setIsCallMenuOpen(false);
      }
    };
    if (isCallMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCallMenuOpen]);

  // High-fidelity Apple spring physics
  const modalSpring = {
    type: 'spring' as const,
    stiffness: 380,
    damping: 28,
    mass: 0.7,
  };

  const pillSpring = {
    type: 'spring' as const,
    stiffness: 420,
    damping: 28,
    mass: 0.6,
  };

  return (
    <>
      {/* Active Modal (HVAC Estimator or Finance Calculator) with Ultra-Smooth Spring Animation */}
      <AnimatePresence mode="wait">
        {activeModal === 'estimator' && (
          <motion.div
            key="estimator-modal"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={modalSpring}
            className="fixed bottom-[calc(1.5%+42px)] lg:bottom-[calc(1%+42px)] right-[1.8%] lg:right-[0.7%] z-50 w-[calc(100vw-24px)] sm:w-[430px] max-h-[85vh] shadow-2xl rounded-none"
          >
            <HvacPricingEstimator
              isFloatingModal
              onClose={() => setActiveModal(null)}
              onMinimize={() => setActiveModal(null)}
            />
          </motion.div>
        )}

        {activeModal === 'finance' && (
          <motion.div
            key="finance-modal"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={modalSpring}
            className="fixed bottom-[calc(1.5%+42px)] lg:bottom-[calc(1%+42px)] right-[1.8%] lg:right-[0.7%] z-50 w-[calc(100vw-24px)] sm:w-[400px] max-h-[85vh] shadow-2xl rounded-none"
          >
            <FloatingFinanceModal onClose={() => setActiveModal(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Apple Dock - Always visible across the whole website */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.2, ...modalSpring }}
        className="fixed bottom-[1.5%] lg:bottom-[1%] right-[1.8%] lg:right-[0.7%] z-50 flex items-center"
      >
        {/* Floating Call Options Popover (Apple Action Card) */}
        <AnimatePresence>
          {isCallMenuOpen && (
            <motion.div
              ref={callMenuRef}
              initial={{ opacity: 0, y: 14, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 450, damping: 28, mass: 0.6 }}
              className="absolute bottom-16 right-0 w-[275px] max-w-[calc(100vw-16px)] bg-[#121417]/95 backdrop-blur-md border border-white/20 rounded-none shadow-2xl shadow-black/80 p-3.5 text-white font-['Delight'] font-normal z-50 space-y-2.5 transform-gpu"
            >
              <div className="flex items-center justify-between px-1 pb-1 border-b border-white/10 text-[11px] text-white/60 uppercase tracking-wider">
                <span>Direct Contact</span>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setIsCallMenuOpen(false)}
                  className="w-5 h-5 rounded-none bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-3 h-3" />
                </motion.button>
              </div>

              {/* Option 1: WhatsApp */}
              <motion.a
                href="https://wa.me/16026229851?text=Hi%2C%20I%20need%20HVAC%20service%20or%20an%20estimate"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsCallMenuOpen(false)}
                className="group flex items-center justify-between p-2.5 rounded-none bg-white text-[#121417] border border-white/40 transition-colors cursor-pointer shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-none bg-emerald-500 text-white flex items-center justify-center shadow-md">
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-medium text-[#121417]">
                      WhatsApp Chat
                    </span>
                    <span className="text-[10px] text-[#121417]/70 font-normal">
                      Instant message response
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#121417]/50 group-hover:text-[#121417] transition-colors" />
              </motion.a>

              {/* Option 2: Direct Phone Call */}
              <motion.a
                href="tel:6026229851"
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsCallMenuOpen(false)}
                className="group flex items-center justify-between p-2.5 rounded-none bg-white text-[#121417] border border-white/40 transition-colors cursor-pointer shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-none bg-[#FE552F] text-white flex items-center justify-center shadow-md">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-medium text-[#121417]">
                      Direct Phone Call
                    </span>
                    <span className="text-[10px] text-[#121417]/70 font-normal">
                      (602) 622-9851 • 24/7
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#121417]/50 group-hover:text-[#121417] transition-colors" />
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dock Island Container with Smooth Shared Layout Transition */}
        <motion.div
          layout
          transition={pillSpring}
          className="flex items-center gap-1.5 p-1.5 bg-[#121417]/90 backdrop-blur-md border border-white/20 rounded-none shadow-2xl shadow-black/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] transition-colors duration-200 transform-gpu"
        >
          {/* BUTTON 1: Cost Estimator */}
          <motion.button
            layout
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              setActiveModal(activeModal === 'estimator' ? null : 'estimator');
              setIsCallMenuOpen(false);
            }}
            onMouseEnter={() => setHoveredButton('estimator')}
            onMouseLeave={() => setHoveredButton(null)}
            transition={pillSpring}
            className={`relative flex items-center h-[35px] rounded-none transition-colors duration-200 cursor-pointer overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] ${
              activeModal === 'estimator'
                ? 'bg-[#FE552F] text-white shadow-lg'
                : 'bg-white/10 hover:bg-white/20 text-white'
            } ${
              showLabels || hoveredButton === 'estimator'
                ? 'px-3 gap-2'
                : 'w-[35px] justify-center px-0'
            }`}
            title="Instant HVAC Cost Estimator"
          >
            <Calculator className="w-4 h-4 shrink-0" />
            <AnimatePresence initial={false}>
              {(showLabels || hoveredButton === 'estimator') && (
                <motion.span
                  layout="position"
                  initial={{ opacity: 0, width: 0, scale: 0.9 }}
                  animate={{ opacity: 1, width: 'auto', scale: 1 }}
                  exit={{ opacity: 0, width: 0, scale: 0.9 }}
                  transition={pillSpring}
                  className="text-xs font-['Delight'] font-normal whitespace-nowrap overflow-hidden tracking-tight select-none"
                >
                  Estimator
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* BUTTON 2: Finance Calculator */}
          <motion.button
            layout
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              setActiveModal(activeModal === 'finance' ? null : 'finance');
              setIsCallMenuOpen(false);
            }}
            onMouseEnter={() => setHoveredButton('finance')}
            onMouseLeave={() => setHoveredButton(null)}
            transition={pillSpring}
            className={`relative flex items-center h-[35px] rounded-none transition-colors duration-200 cursor-pointer overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] ${
              activeModal === 'finance'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white/10 hover:bg-white/20 text-white'
            } ${
              showLabels || hoveredButton === 'finance'
                ? 'px-3 gap-2'
                : 'w-[35px] justify-center px-0'
            }`}
            title="0% APR Finance Calculator"
          >
            <Percent className="w-4 h-4 shrink-0" />
            <AnimatePresence initial={false}>
              {(showLabels || hoveredButton === 'finance') && (
                <motion.span
                  layout="position"
                  initial={{ opacity: 0, width: 0, scale: 0.9 }}
                  animate={{ opacity: 1, width: 'auto', scale: 1 }}
                  exit={{ opacity: 0, width: 0, scale: 0.9 }}
                  transition={pillSpring}
                  className="text-xs font-['Delight'] font-normal whitespace-nowrap overflow-hidden tracking-tight select-none"
                >
                  Financing
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* BUTTON 3: Call & WhatsApp Menu */}
          <motion.button
            layout
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              setIsCallMenuOpen(!isCallMenuOpen);
              if (activeModal) setActiveModal(null);
            }}
            onMouseEnter={() => setHoveredButton('call')}
            onMouseLeave={() => setHoveredButton(null)}
            transition={pillSpring}
            className={`relative flex items-center h-[35px] rounded-none transition-colors duration-200 cursor-pointer overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] ${
              isCallMenuOpen
                ? 'bg-[#FE552F] text-white shadow-lg'
                : 'bg-white/10 hover:bg-white/20 text-white'
            } ${
              showLabels || hoveredButton === 'call'
                ? 'px-3 gap-2'
                : 'w-[35px] justify-center px-0'
            }`}
            title="Contact (WhatsApp & Direct Call)"
          >
            <Phone className="w-4 h-4 shrink-0" />
            <AnimatePresence initial={false}>
              {(showLabels || hoveredButton === 'call') && (
                <motion.span
                  layout="position"
                  initial={{ opacity: 0, width: 0, scale: 0.9 }}
                  animate={{ opacity: 1, width: 'auto', scale: 1 }}
                  exit={{ opacity: 0, width: 0, scale: 0.9 }}
                  transition={pillSpring}
                  className="text-xs font-['Delight'] font-normal whitespace-nowrap overflow-hidden tracking-tight select-none"
                >
                  Call Us
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
};
