import React, { useState } from 'react';
import {
  Calendar,
  ShieldCheck,
  Zap,
  CheckCircle2,
  X,
  PhoneCall,
} from 'lucide-react';
import { SplitTextHover } from '../ui/SplitTextHover';

export const EmergencyCtaBanner: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetTemp, setTargetTemp] = useState(68);
  const [issueType, setIssueType] = useState('no-cool');
  const [phoneInput, setPhoneInput] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput) return;
    setIsSubmitted(true);
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
    setPhoneInput('');
    setAddressInput('');
  };

  return (
    <section
      id="emergency-cta-banner"
      data-section="dispatch"
      className="w-full max-w-[100vw] max-h-[1000vh] bg-[#FFFFFF] py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden select-none border-t border-zinc-100"
    >
      <div id="dispatch" className="absolute -top-24 pointer-events-none" />
      {/* Subtle Ambient Radial Glow for High-Key Studio Finish */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,85,47,0.03)_0%,rgba(255,255,255,0)_70%)] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Live Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FE552F]/10 text-[#FE552F] text-[11px] sm:text-[12px] font-['Delight'] font-semibold uppercase tracking-wider rounded-full mb-6 border border-[#FE552F]/20">
          <span className="w-2 h-2 rounded-full bg-[#FE552F] animate-pulse" />
          <span>Right now in Phoenix: 5 open emergency slots</span>
        </div>

        {/* Minimalist Precision Hardware Visual (Matching 100% Uploaded Reference) */}
        <div className="relative w-full max-w-2xl sm:max-w-3xl aspect-[16/9] flex items-center justify-center mb-6 sm:mb-8">
          <div className="relative w-full h-full rounded-2xl overflow-hidden group">
            {/* The Ultra-Realistic Studio AC Dial / Controller Image */}
            <img
              src="/emergency_hvac_cta.jpg"
              alt="Emergency Smart HVAC Precision Climate Control in Hand"
              className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.015]"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />

            {/* Interactive Temperature Fine-Tuner Hover Chip on the dial */}
            <div className="absolute top-4 right-4 sm:top-8 sm:right-12 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-none shadow-lg border border-zinc-200/80 flex items-center gap-3">
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-['Delight'] font-semibold tracking-wider text-zinc-400">
                  Target Climate
                </span>
                <span className="text-lg font-['Nohemi'] font-bold text-[#121417] leading-none">
                  {targetTemp}°F
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setTargetTemp((t) => Math.max(60, t - 1))}
                  className="w-6 h-6 rounded-none bg-[#ECEDEF] hover:bg-zinc-300 text-[#121417] font-bold text-xs flex items-center justify-center transition-colors cursor-pointer"
                  title="Cool Down"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => setTargetTemp((t) => Math.min(82, t + 1))}
                  className="w-6 h-6 rounded-none bg-[#ECEDEF] hover:bg-zinc-300 text-[#121417] font-bold text-xs flex items-center justify-center transition-colors cursor-pointer"
                  title="Warm Up"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist Editorial Headline in Nohemi Bold */}
        <div className="space-y-3 mb-6 sm:mb-8 max-w-2xl">
          <h2 className="font-['Nohemi'] font-bold text-3xl sm:text-4xl lg:text-5xl text-[#121417] tracking-tight leading-[1.1]">
            AC down? Don't stress. We'll put your mind at ease.
          </h2>
          <p className="font-['Delight'] font-normal text-base sm:text-lg text-zinc-500 max-w-xl mx-auto leading-relaxed">
            Firefighter owned & operated. Fast, same-day service with zero overtime charges. Call our emergency dispatch line now.
          </p>
        </div>

        {/* The Two Dedicated Action Buttons: 1 for Booking, 1 for Emergency Call */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md mx-auto mb-8 sm:mb-10">
          {/* Button 1: Immediate Emergency Call Button (High-Contrast Coral Accent) */}
          <a
            id="emergency-cta-call-btn"
            href="tel:+16233353958"
            className="group w-full sm:w-auto min-w-[210px] h-[45px] inline-flex items-center justify-center gap-2.5 px-7 rounded-none bg-[#FE552F] text-white hover:bg-[#e04521] transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer"
          >
            <PhoneCall className="w-5 h-5 stroke-[2.2] animate-bounce" />
            <span className="font-['Delight'] font-medium text-sm sm:text-base tracking-wide whitespace-nowrap">
              <SplitTextHover text="Emergency Call" />
            </span>
          </a>

          {/* Button 2: Rapid Booking Button (Deep Charcoal Pill with Arrow) */}
          <button
            id="emergency-cta-book-btn"
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="group w-full sm:w-auto min-w-[210px] h-[45px] inline-flex items-center justify-center px-7 rounded-none bg-[#121417] text-white hover:bg-zinc-800 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer"
          >
            <span className="font-['Delight'] font-medium text-sm sm:text-base tracking-wide whitespace-nowrap">
              <SplitTextHover text="Book Rapid Service" />
            </span>
          </button>
        </div>

        {/* Reassurance Trust Strip */}
        <div className="flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-3 text-[10px] font-['Delight'] text-zinc-500 pt-2 border-t border-zinc-100 w-full max-w-xl overflow-x-auto whitespace-nowrap">
          <div className="flex items-center gap-1 shrink-0">
            <Zap className="w-3 h-3 text-[#FE552F]" />
            <span>Under 45-min arrival</span>
          </div>
          <span className="text-zinc-300">•</span>
          <div className="flex items-center gap-1 shrink-0">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>No overtime or holiday charges</span>
          </div>
          <span className="text-zinc-300">•</span>
          <div className="flex items-center gap-1 shrink-0">
            <CheckCircle2 className="w-3 h-3 text-blue-600" />
            <span>NATE-certified technicians</span>
          </div>
        </div>
      </div>

      {/* Rapid Emergency Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121417]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-white rounded-none max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-zinc-100 relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={resetModal}
              className="absolute top-5 right-5 p-2 rounded-none hover:bg-[#ECEDEF] text-zinc-400 hover:text-[#121417] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-none bg-[#FE552F]/10 text-[#FE552F] flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h3 className="font-['Nohemi'] font-bold text-xl sm:text-2xl text-[#121417]">
                    Rapid Emergency Dispatch
                  </h3>
                </div>
                <p className="font-['Delight'] text-sm text-zinc-500 mb-6">
                  Fill out this 15-second form and our nearest on-duty technician will be dispatched to your location.
                </p>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-['Delight'] font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                      What is happening with your system?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'no-cool', label: 'AC Blowing Warm Air' },
                        { id: 'leaking', label: 'Water Leaking Indoors' },
                        { id: 'noise', label: 'Loud Clanking/Banging' },
                        { id: 'shutdown', label: 'Complete System Shutdown' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setIssueType(item.id)}
                          className={`px-3 py-2.5 rounded-none text-xs font-['Delight'] text-left transition-all border cursor-pointer ${
                            issueType === item.id
                              ? 'bg-[#121417] text-white border-[#121417] font-medium'
                              : 'bg-[#ECEDEF] text-zinc-700 border-transparent hover:bg-zinc-200'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-['Delight'] font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Your Phone Number (For Immediate Dispatch Call)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(480) 000-0000"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="w-full px-4 py-3 rounded-none border border-zinc-200 bg-white font-['Delight'] text-sm text-[#121417] focus:outline-none focus:ring-2 focus:ring-[#121417]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-['Delight'] font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Street Address or Valley City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Scottsdale, Phoenix, Mesa..."
                      value={addressInput}
                      onChange={(e) => setAddressInput(e.target.value)}
                      className="w-full px-4 py-3 rounded-none border border-zinc-200 bg-white font-['Delight'] text-sm text-[#121417] focus:outline-none focus:ring-2 focus:ring-[#121417]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-none bg-[#FE552F] text-white font-['Delight'] font-medium text-sm sm:text-base hover:bg-[#e04521] transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Confirm & Dispatch Tech Now</span>
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-none bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-['Nohemi'] font-bold text-2xl text-[#121417]">
                  Technician Dispatched!
                </h3>
                <p className="font-['Delight'] text-sm text-zinc-600 max-w-sm mx-auto">
                  Our live dispatch coordinator is ringing{' '}
                  <strong className="text-[#121417]">{phoneInput}</strong> right now. Unit #402 is en route with an estimated arrival in <strong>32 minutes</strong>.
                </p>
                <div className="p-3 bg-[#ECEDEF] rounded-none text-xs font-['Delight'] text-zinc-600 inline-block">
                  Need immediate telephone assistance? Call{' '}
                  <a href="tel:+16233353958" className="font-bold text-[#FE552F] underline">
                    (623) 335-3958
                  </a>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={resetModal}
                    className="mt-4 px-6 py-2.5 rounded-none bg-[#121417] text-white text-xs font-['Delight'] font-medium hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
