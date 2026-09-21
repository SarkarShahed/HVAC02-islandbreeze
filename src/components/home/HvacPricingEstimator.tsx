import React, { useState, useRef } from 'react';
import {
  Wrench,
  Plus,
  RefreshCw,
  SlidersHorizontal,
  ClipboardCheck,
  Wind,
  Home,
  AirVent,
  Flame,
  Thermometer,
  Box,
  HelpCircle,
  ZapOff,
  ThermometerSnowflake,
  Droplet,
  Volume2,
  MoreHorizontal,
  AlertCircle,
  Clock,
  Calendar,
  Camera,
  Check,
  X,
  Minus,
  Mail,
  Phone,
  User,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { useHvacEstimator, ServiceType, SystemType, IssueType, UrgencyType, UploadedPhoto } from '../../context/HvacEstimatorContext';

export type { ServiceType, SystemType, IssueType, UrgencyType, UploadedPhoto };

interface HvacPricingEstimatorProps {
  isFloatingModal?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
}

export default function HvacPricingEstimator({
  isFloatingModal = false,
  onClose,
  onMinimize,
}: HvacPricingEstimatorProps) {
  // Try using shared context state
  let contextState;
  try {
    contextState = useHvacEstimator();
  } catch (e) {
    contextState = null;
  }

  // Fallback local state if context is not present
  const [localStep, setLocalStep] = useState<number>(1);
  const [localSelectedService, setLocalSelectedService] = useState<ServiceType | null>('repair');
  const [localSelectedSystem, setLocalSelectedSystem] = useState<SystemType>('central-ac');
  const [localSqft, setLocalSqft] = useState<number>(1500);
  const [localSystemAge, setLocalSystemAge] = useState<number>(8);
  const [localSelectedIssue, setLocalSelectedIssue] = useState<IssueType | null>('not-cooling-heating');
  const [localIssueDetails, setLocalIssueDetails] = useState<string>('');
  const [localSelectedUrgency, setLocalSelectedUrgency] = useState<UrgencyType | null>('soon');
  const [localPhotos, setLocalPhotos] = useState<UploadedPhoto[]>([]);
  const localFileInputRef = useRef<HTMLInputElement | null>(null);
  const [localFullName, setLocalFullName] = useState<string>('');
  const [localPhone, setLocalPhone] = useState<string>('');
  const [localMessage, setLocalMessage] = useState<string>('');
  const [localEmail, setLocalEmail] = useState<string>('');
  const [localEmailSent, setLocalEmailSent] = useState<boolean>(false);

  const step = contextState ? contextState.step : localStep;
  const setStep = contextState ? contextState.setStep : setLocalStep;
  const selectedService = contextState ? contextState.selectedService : localSelectedService;
  const setSelectedService = contextState ? contextState.setSelectedService : setLocalSelectedService;
  const selectedSystem = contextState ? contextState.selectedSystem : localSelectedSystem;
  const setSelectedSystem = contextState ? contextState.setSelectedSystem : setLocalSelectedSystem;
  const sqft = contextState ? contextState.sqft : localSqft;
  const setSqft = contextState ? contextState.setSqft : setLocalSqft;
  const systemAge = contextState ? contextState.systemAge : localSystemAge;
  const setSystemAge = contextState ? contextState.setSystemAge : setLocalSystemAge;
  const selectedIssue = contextState ? contextState.selectedIssue : localSelectedIssue;
  const setSelectedIssue = contextState ? contextState.setSelectedIssue : setLocalSelectedIssue;
  const issueDetails = contextState ? contextState.issueDetails : localIssueDetails;
  const setIssueDetails = contextState ? contextState.setIssueDetails : setLocalIssueDetails;
  const selectedUrgency = contextState ? contextState.selectedUrgency : localSelectedUrgency;
  const setSelectedUrgency = contextState ? contextState.setSelectedUrgency : setLocalSelectedUrgency;
  const photos = contextState ? contextState.photos : localPhotos;
  const setPhotos = contextState ? contextState.setPhotos : setLocalPhotos;
  const fileInputRef = contextState ? contextState.fileInputRef : localFileInputRef;
  const fullName = contextState ? contextState.fullName : localFullName;
  const setFullName = contextState ? contextState.setFullName : setLocalFullName;
  const phone = contextState ? contextState.phone : localPhone;
  const setPhone = contextState ? contextState.setPhone : setLocalPhone;
  const message = contextState ? contextState.message : localMessage;
  const setMessage = contextState ? contextState.setMessage : setLocalMessage;
  const email = contextState ? contextState.email : localEmail;
  const setEmail = contextState ? contextState.setEmail : setLocalEmail;
  const emailSent = contextState ? contextState.emailSent : localEmailSent;
  const setEmailSent = contextState ? contextState.setEmailSent : setLocalEmailSent;

  const calculatePricing = contextState ? contextState.calculatePricing : () => {
    const bases: Record<ServiceType, number> = {
      repair: 320,
      install: 4500,
      replace: 3800,
      tune: 120,
      inspect: 95,
      duct: 450,
    };

    const serviceKey = selectedService || 'repair';
    const baseRate = bases[serviceKey] || 320;
    const sizeMultiplier = 0.5 + sqft / 3000;
    const ageBonus = systemAge > 15 ? 1.3 : systemAge > 10 ? 1.15 : 1.0;
    const urgencyBonus = selectedUrgency === 'emergency' ? 1.35 : 1.0;

    const base = baseRate * sizeMultiplier * ageBonus * urgencyBonus;
    const low = Math.round(base * 0.85);
    const high = Math.round(base * 1.2);
    const mid = Math.round(base);

    return {
      low,
      high,
      mid,
      labor: Math.round(mid * 0.45),
      parts: Math.round(mid * 0.35),
      diagnostic: Math.round(mid * 0.12),
      emergencySurcharge: selectedUrgency === 'emergency' ? Math.max(0, Math.round(mid * 0.2)) : 0,
    };
  };

  const pricing = calculatePricing();

  const handlePhotoUpload = contextState ? contextState.handlePhotoUpload : (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newPhotos: UploadedPhoto[] = files.map((file, idx) => ({
      id: `${Date.now()}-${idx}`,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const removePhoto = contextState ? contextState.removePhoto : (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSendEmail = contextState ? contextState.handleSendEmail : (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
    }, 4500);
  };

  const stepsList = [
    { num: 1, label: 'Service' },
    { num: 2, label: 'System' },
    { num: 3, label: 'Details' },
    { num: 4, label: 'Photos' },
    { num: 5, label: 'Estimate' },
  ];

  return (
    <div
      id="hvac-dynamic-pricing-estimator"
      className={`w-full bg-[#121417]/55 backdrop-blur-[25px] text-white rounded-none shadow-2xl shadow-black/70 border border-white/20 overflow-hidden flex flex-col transition-all duration-300 mb-0 pb-0 mt-auto self-end ${
        isFloatingModal ? 'max-h-[85vh]' : 'max-h-[580px]'
      } font-['Delight'] font-normal`}
    >
      {/* Estimator Header Banner - Apple Frosted Header */}
      <div className="bg-white/[0.04] backdrop-blur-[25px] text-white px-3.5 sm:px-4 py-3 flex items-center justify-between border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2.5">
          {/* Calculator SVG Icon */}
          <div className="w-7 h-7 rounded-none bg-[#2934ce] text-white flex items-center justify-center border border-[#2934ce]/50 backdrop-blur-[25px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-calculator"
            >
              <rect width="16" height="20" x="4" y="2" rx="0" />
              <line x1="8" x2="16" y1="6" y2="6" />
              <line x1="16" x2="16" y1="14" y2="18" />
              <path d="M16 10h.01" />
              <path d="M12 10h.01" />
              <path d="M8 10h.01" />
              <path d="M12 14h.01" />
              <path d="M8 14h.01" />
              <path d="M12 18h.01" />
              <path d="M8 18h.01" />
            </svg>
          </div>
          <span className="font-normal text-xs sm:text-[13px] tracking-tight text-white uppercase">
            Instant Cost Estimator
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-normal text-white/80 bg-white/10 px-2.5 py-0.5 rounded-none border border-white/15 backdrop-blur-[25px]">
            Step {step} of 5
          </span>

          {isFloatingModal && (
            <div className="flex items-center gap-1.5 ml-1 border-l border-white/15 pl-2">
              {onMinimize && (
                <button
                  type="button"
                  onClick={onMinimize}
                  className="w-6 h-6 rounded-none bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-[25px]"
                  title="Minimize"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
              )}
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="w-6 h-6 rounded-none bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-[25px]"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* TOP PROGRESS BAR */}
      <div className="px-3.5 sm:px-4 py-2.5 bg-white/[0.02] backdrop-blur-[25px] border-b border-white/10 shrink-0">
        <div className="flex items-center justify-between relative">
          {stepsList.map((st, idx) => {
            const isCompleted = step > st.num;
            const isActive = step === st.num;
            const isLast = idx === stepsList.length - 1;

            return (
              <React.Fragment key={st.num}>
                <div className="flex flex-col items-center relative z-10">
                  <button
                    type="button"
                    onClick={() => {
                    if (st.num < step) setStep(st.num);
                    }}
                    disabled={st.num > step}
                    className={`w-6 h-6 rounded-none flex items-center justify-center text-[10px] font-normal transition-all duration-200 ${
                      isActive
                        ? 'bg-white text-[#121417] shadow-sm ring-2 ring-white/30'
                        : isCompleted
                        ? 'bg-white/20 text-white border border-white/40 cursor-pointer backdrop-blur-[25px]'
                        : 'bg-white/5 text-white/40 border border-white/10 backdrop-blur-[25px]'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3 h-3 stroke-[2]" /> : st.num}
                  </button>
                  <span
                    className={`text-[9px] mt-0.5 font-normal ${
                      isActive
                        ? 'text-white'
                        : isCompleted
                        ? 'text-white/80'
                        : 'text-white/40'
                    }`}
                  >
                    {st.label}
                  </span>
                </div>

                {!isLast && (
                  <div
                    className={`flex-1 h-[1.5px] mx-1 -mt-3.5 transition-colors duration-200 ${
                      step > st.num ? 'bg-white' : 'bg-white/10'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* STEP CONTENT BODY */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between overflow-y-auto min-h-0 text-left">
        {/* ================= STEP 1: SERVICE TYPE ================= */}
        {step === 1 && (
          <div className="space-y-3">
            <div>
              <h3 className="font-normal text-sm sm:text-base text-white tracking-tight">
                What service do you need?
              </h3>
              <p className="text-[11px] font-normal text-white/60">
                Select the type of HVAC service
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'repair', title: 'Repair', sub: 'Fix faults', icon: Wrench },
                { id: 'install', title: 'New install', sub: 'Complete setup', icon: Plus },
                { id: 'replace', title: 'Replacement', sub: 'Upgrade unit', icon: RefreshCw },
                { id: 'tune', title: 'Tune-up', sub: 'Seasonal care', icon: SlidersHorizontal },
                { id: 'inspect', title: 'Inspection', sub: 'System audit', icon: ClipboardCheck },
                { id: 'duct', title: 'Duct work', sub: 'Airflow fix', icon: Wind },
              ].map((item) => {
                const isSelected = selectedService === item.id;
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedService(item.id as ServiceType)}
                    className={`p-2.5 rounded-none border text-left flex items-start gap-2.5 transition-all duration-150 cursor-pointer backdrop-blur-[25px] ${
                      isSelected
                        ? 'border-white/50 bg-white/20 shadow-md ring-1 ring-white/30'
                        : 'border-white/10 bg-white/[0.05] text-white/90 hover:border-white/25 hover:bg-white/[0.1]'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-none flex items-center justify-center shrink-0 backdrop-blur-[25px] ${
                        isSelected ? 'text-[#121417] bg-white shadow-xs' : 'text-white bg-white/10'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-normal text-xs text-white leading-tight">
                        {item.title}
                      </div>
                      <div className="font-normal text-[10px] text-white/50 mt-0.5 leading-none">
                        {item.sub}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 2: SYSTEM INFO ================= */}
        {step === 2 && (
          <div className="space-y-3">
            <div>
              <h3 className="font-normal text-sm sm:text-base text-white tracking-tight">
                Tell us about your system
              </h3>
              <p className="text-[11px] font-normal text-white/60">
                Specify system format, area & age
              </p>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'central-ac', title: 'Central AC', icon: Home },
                { id: 'mini-split', title: 'Mini-split', icon: AirVent },
                { id: 'heat-pump', title: 'Heat pump', icon: Flame },
                { id: 'furnace', title: 'Furnace', icon: Thermometer },
                { id: 'package', title: 'Package unit', icon: Box },
                { id: 'not-sure', title: 'Not sure', icon: HelpCircle },
              ].map((item) => {
                const isSelected = selectedSystem === item.id;
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedSystem(item.id as SystemType)}
                    className={`p-2 rounded-none border text-center flex flex-col items-center justify-center gap-1 transition-all duration-150 cursor-pointer backdrop-blur-[25px] ${
                      isSelected
                        ? 'border-white/50 bg-white/20 shadow-md ring-1 ring-white/30'
                        : 'border-white/10 bg-white/[0.05] text-white/90 hover:border-white/25 hover:bg-white/[0.1]'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-white/70'}`} />
                    <span className="font-normal text-[10px] text-white/90 leading-tight">
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Home size */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-normal text-white/80">Home size (sq ft)</span>
                <span className="font-normal text-white text-[11px] bg-white/10 px-2 py-0.5 rounded-none border border-white/15 backdrop-blur-[25px]">
                  {sqft.toLocaleString()} sq ft
                </span>
              </div>
              <input
                type="range"
                min={500}
                max={5000}
                step={100}
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="w-full h-1.5 bg-white/20 rounded-none appearance-none cursor-pointer accent-white"
              />
            </div>

            {/* System age */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-normal text-white/80">System age (years)</span>
                <span className="font-normal text-white text-[11px] bg-white/10 px-2 py-0.5 rounded-none border border-white/15 backdrop-blur-[25px]">
                  {systemAge} yrs
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={25}
                step={1}
                value={systemAge}
                onChange={(e) => setSystemAge(Number(e.target.value))}
                className="w-full h-1.5 bg-white/20 rounded-none appearance-none cursor-pointer accent-white"
              />
            </div>
          </div>
        )}

        {/* ================= STEP 3: PROBLEM DETAILS ================= */}
        {step === 3 && (
          <div className="space-y-3">
            <div>
              <h3 className="font-normal text-sm sm:text-base text-white tracking-tight">
                Describe the issue
              </h3>
              <p className="text-[11px] font-normal text-white/60">
                Tell us what symptoms you are experiencing
              </p>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'not-turning-on', title: 'Not turning on', icon: ZapOff },
                { id: 'not-cooling-heating', title: 'Not cooling/heating', icon: ThermometerSnowflake },
                { id: 'water-leaking', title: 'Water leaking', icon: Droplet },
                { id: 'strange-noise', title: 'Strange noise', icon: Volume2 },
                { id: 'bad-smell', title: 'Bad smell/odor', icon: Wind },
                { id: 'other', title: 'Something else', icon: MoreHorizontal },
              ].map((item) => {
                const isSelected = selectedIssue === item.id;
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedIssue(item.id as IssueType)}
                    className={`p-2 rounded-none border text-left flex items-center gap-2 transition-all duration-150 cursor-pointer backdrop-blur-[25px] ${
                      isSelected
                        ? 'border-white/50 bg-white/20 shadow-md ring-1 ring-white/30'
                        : 'border-white/10 bg-white/[0.05] text-white/90 hover:border-white/25 hover:bg-white/[0.1]'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-white/70'}`} />
                    <span className="font-normal text-[11px] text-white/90 leading-tight">
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <input
              type="text"
              value={issueDetails}
              onChange={(e) => setIssueDetails(e.target.value)}
              placeholder="Any extra details... (optional)"
              className="w-full text-xs p-2.5 rounded-none border border-white/15 focus:border-white/40 focus:bg-white/10 focus:outline-none bg-white/[0.05] backdrop-blur-[25px] text-white placeholder-white/40 font-normal transition-all"
            />

            {/* Urgency */}
            <div className="space-y-1.5 pt-1">
              <span className="font-normal text-[11px] text-white/80">Urgency</span>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'emergency', title: 'Emergency', sub: 'Today', icon: AlertCircle },
                  { id: 'soon', title: 'Soon', sub: 'This week', icon: Clock },
                  { id: 'planning', title: 'Planning', sub: 'No rush', icon: Calendar },
                ].map((item) => {
                  const isSelected = selectedUrgency === item.id;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedUrgency(item.id as UrgencyType)}
                      className={`p-1.5 rounded-none border text-center flex flex-col items-center justify-center gap-0.5 transition-all duration-150 cursor-pointer backdrop-blur-[25px] ${
                        isSelected
                          ? 'border-white/50 bg-white/20 shadow-md ring-1 ring-white/30'
                          : 'border-white/10 bg-white/[0.05] text-white/90 hover:border-white/25 hover:bg-white/[0.1]'
                      }`}
                    >
                      <Icon className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-white/70'}`} />
                      <span className="font-normal text-[10px] text-white/90 leading-none">
                        {item.title}
                      </span>
                      <span className="font-normal text-[8px] text-white/50 leading-none mt-0.5">
                        {item.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 4: PHOTO UPLOAD ================= */}
        {step === 4 && (
          <div className="space-y-3">
            <div>
              <h3 className="font-normal text-sm sm:text-base text-white tracking-tight">Upload photos</h3>
              <p className="text-[11px] font-normal text-white/60">
                Helps technicians diagnose faster
              </p>
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border border-dashed border-white/20 hover:border-white/40 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-[25px] p-3.5 rounded-none text-center cursor-pointer transition-all duration-150 flex flex-col items-center justify-center gap-1.5"
            >
              <Camera className="w-5 h-5 text-white/80" />
              <span className="font-normal text-[11px] text-white">Tap to upload photos</span>
              <span className="font-normal text-[9px] text-white/50">JPG, PNG, HEIC</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>

            {photos.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="relative w-[44px] h-[44px] rounded-none overflow-hidden border border-white/20 backdrop-blur-[25px]"
                  >
                    <img src={photo.url} alt="HVAC Upload" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removePhoto(photo.id);
                      }}
                      className="absolute top-0 right-0 w-4 h-4 bg-black/70 text-white flex items-center justify-center rounded-none"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 5: ESTIMATE RESULT ================= */}
        {step === 5 && (
          <div className="space-y-2.5 pt-0.5">
            <div className="p-3 rounded-none bg-white/[0.08] backdrop-blur-[25px] text-white border border-white/15 text-center">
              <span className="font-normal text-[10px] uppercase tracking-wider text-white/60">Estimated total</span>
              <div className="font-normal text-3xl text-white tracking-tight mt-0.5">
                ${pricing.mid.toLocaleString()}
              </div>
              <div className="font-normal text-[11px] text-white/60 mt-0.5">
                Range: ${pricing.low.toLocaleString()} – ${pricing.high.toLocaleString()}
              </div>
            </div>

            <div className="bg-white/[0.04] backdrop-blur-[25px] rounded-none p-2.5 border border-white/10 text-[11px] space-y-1.5 font-normal">
              <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
                <span className="text-white/70">Equipment & Labor</span>
                <span className="text-white font-normal">${(pricing.labor + pricing.parts).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pb-1">
                <span className="text-white/70">Service Call Diagnostics</span>
                <span className="text-white font-normal">${pricing.diagnostic.toLocaleString()}</span>
              </div>
              {selectedUrgency === 'emergency' && (
                <div className="flex justify-between items-center text-white pt-1 border-t border-white/10">
                  <span>Emergency dispatch fee</span>
                  <span>${pricing.emergencySurcharge.toLocaleString()}</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSendEmail} className="space-y-2 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-2.5 text-white/50" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full text-xs pl-8 pr-3 py-2 rounded-none border border-white/15 focus:border-white/40 focus:bg-white/10 focus:outline-none bg-white/[0.05] backdrop-blur-[25px] text-white placeholder-white/40 font-normal transition-all"
                  />
                </div>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 absolute left-3 top-2.5 text-white/50" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full text-xs pl-8 pr-3 py-2 rounded-none border border-white/15 focus:border-white/40 focus:bg-white/10 focus:outline-none bg-white/[0.05] backdrop-blur-[25px] text-white placeholder-white/40 font-normal transition-all"
                  />
                </div>
              </div>

              <div className="relative">
                <Mail className="w-3.5 h-3.5 absolute left-3 top-2.5 text-white/50" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full text-xs pl-8 pr-3 py-2 rounded-none border border-white/15 focus:border-white/40 focus:bg-white/10 focus:outline-none bg-white/[0.05] backdrop-blur-[25px] text-white placeholder-white/40 font-normal transition-all"
                />
              </div>

              <div className="relative">
                <MessageSquare className="w-3.5 h-3.5 absolute left-3 top-2.5 text-white/50" />
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Short note or preferred service time... (optional)"
                  className="w-full text-xs pl-8 pr-3 py-2 rounded-none border border-white/15 focus:border-white/40 focus:bg-white/10 focus:outline-none bg-white/[0.05] backdrop-blur-[25px] text-white placeholder-white/40 font-normal resize-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={!email || !email.includes('@') || !fullName || !phone}
                className="w-full h-[38px] flex items-center justify-center gap-2 px-3 rounded-none bg-[#FE552F] hover:bg-[#e04522] text-white disabled:opacity-40 text-xs font-normal uppercase tracking-wider transition-all cursor-pointer shadow-lg active:scale-[0.98]"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{emailSent ? 'Estimate & Request Sent!' : 'Send My Estimate & Request'}</span>
              </button>
            </form>
          </div>
        )}

        {/* BOTTOM NAVIGATION BUTTONS ROW */}
        {step < 5 && (
          <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-white/10 shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                className="h-[32px] flex items-center gap-1.5 px-3 rounded-none bg-white/10 border border-white/15 hover:bg-white/20 text-white font-normal text-xs uppercase tracking-wider transition-all backdrop-blur-[25px] cursor-pointer"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={() => {
                if (step === 4) setStep(5);
                else setStep((s) => s + 1);
              }}
              className="h-[32px] flex items-center gap-1.5 px-4 rounded-none bg-white text-[#121417] hover:bg-white/90 active:scale-[0.98] font-normal text-xs uppercase tracking-wider transition-all ml-auto cursor-pointer shadow-sm"
            >
              <span>{step === 4 ? 'Estimate' : 'Next'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
