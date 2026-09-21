import React, { createContext, useContext, useState, useRef } from 'react';

export type ServiceType = 'repair' | 'install' | 'replace' | 'tune' | 'inspect' | 'duct';
export type SystemType = 'central-ac' | 'mini-split' | 'heat-pump' | 'furnace' | 'package' | 'not-sure';
export type IssueType = 'not-turning-on' | 'not-cooling-heating' | 'water-leaking' | 'strange-noise' | 'bad-smell' | 'other';
export type UrgencyType = 'emergency' | 'soon' | 'planning';

export interface UploadedPhoto {
  id: string;
  url: string;
  name: string;
}

interface PricingBreakdown {
  low: number;
  high: number;
  mid: number;
  labor: number;
  parts: number;
  diagnostic: number;
  emergencySurcharge: number;
}

interface HvacEstimatorContextType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  selectedService: ServiceType | null;
  setSelectedService: React.Dispatch<React.SetStateAction<ServiceType | null>>;
  selectedSystem: SystemType;
  setSelectedSystem: React.Dispatch<React.SetStateAction<SystemType>>;
  sqft: number;
  setSqft: React.Dispatch<React.SetStateAction<number>>;
  systemAge: number;
  setSystemAge: React.Dispatch<React.SetStateAction<number>>;
  selectedIssue: IssueType | null;
  setSelectedIssue: React.Dispatch<React.SetStateAction<IssueType | null>>;
  issueDetails: string;
  setIssueDetails: React.Dispatch<React.SetStateAction<string>>;
  selectedUrgency: UrgencyType | null;
  setSelectedUrgency: React.Dispatch<React.SetStateAction<UrgencyType | null>>;
  photos: UploadedPhoto[];
  setPhotos: React.Dispatch<React.SetStateAction<UploadedPhoto[]>>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  fullName: string;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  emailSent: boolean;
  setEmailSent: React.Dispatch<React.SetStateAction<boolean>>;
  showExplanation: boolean;
  setShowExplanation: React.Dispatch<React.SetStateAction<boolean>>;
  calculatePricing: () => PricingBreakdown;
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removePhoto: (id: string) => void;
  handleSendEmail: (e: React.FormEvent) => void;
  resetEstimator: () => void;
}

const HvacEstimatorContext = createContext<HvacEstimatorContextType | undefined>(undefined);

export const HvacEstimatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<ServiceType | null>('repair');
  const [selectedSystem, setSelectedSystem] = useState<SystemType>('central-ac');
  const [sqft, setSqft] = useState<number>(1500);
  const [systemAge, setSystemAge] = useState<number>(8);
  const [selectedIssue, setSelectedIssue] = useState<IssueType | null>('not-cooling-heating');
  const [issueDetails, setIssueDetails] = useState<string>('');
  const [selectedUrgency, setSelectedUrgency] = useState<UrgencyType | null>('soon');
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const calculatePricing = (): PricingBreakdown => {
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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newPhotos: UploadedPhoto[] = files.map((file, idx) => ({
      id: `${Date.now()}-${idx}`,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
    }, 4500);
  };

  const resetEstimator = () => {
    setStep(1);
    setSelectedService('repair');
    setSelectedSystem('central-ac');
    setSqft(1500);
    setSystemAge(8);
    setSelectedIssue('not-cooling-heating');
    setIssueDetails('');
    setSelectedUrgency('soon');
    setPhotos([]);
    setFullName('');
    setPhone('');
    setMessage('');
    setEmail('');
    setEmailSent(false);
    setShowExplanation(false);
  };

  return (
    <HvacEstimatorContext.Provider
      value={{
        step,
        setStep,
        selectedService,
        setSelectedService,
        selectedSystem,
        setSelectedSystem,
        sqft,
        setSqft,
        systemAge,
        setSystemAge,
        selectedIssue,
        setSelectedIssue,
        issueDetails,
        setIssueDetails,
        selectedUrgency,
        setSelectedUrgency,
        photos,
        setPhotos,
        fileInputRef,
        fullName,
        setFullName,
        phone,
        setPhone,
        message,
        setMessage,
        email,
        setEmail,
        emailSent,
        setEmailSent,
        showExplanation,
        setShowExplanation,
        calculatePricing,
        handlePhotoUpload,
        removePhoto,
        handleSendEmail,
        resetEstimator,
      }}
    >
      {children}
    </HvacEstimatorContext.Provider>
  );
};

export const useHvacEstimator = () => {
  const context = useContext(HvacEstimatorContext);
  if (!context) {
    throw new Error('useHvacEstimator must be used within an HvacEstimatorProvider');
  }
  return context;
};
