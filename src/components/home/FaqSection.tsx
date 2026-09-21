import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Minus, Plus } from 'lucide-react';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const hvacFaqs: FaqItem[] = [
  {
    id: 'tune-up-scope',
    question: 'What is included in an Island Breeze AC & Heating tune-up?',
    answer:
      'Our comprehensive multi-point tune-up is conducted under our ROC #327760 license requirements. It covers heat exchanger safety inspection, electrical terminal testing, refrigerant level calibration, condensate drain flush, blower motor cleaning, thermostat validation, and airflow balancing to ensure optimal efficiency and protect your comfort in the Phoenix heat.',
  },
  {
    id: 'maintenance-frequency',
    question: 'How often should I service my heating and air conditioning system?',
    answer:
      'We recommend scheduling professional maintenance twice a year across the entire Phoenix metro area, including the East and West Valleys. Regular seasonal checkups ensure your unit is ready for extreme desert temperatures, maintain manufacturer warranties, prevent 95% of unexpected breakdowns, and keep utility bills low.',
  },
  {
    id: 'repair-vs-replace',
    question: 'How do I know if my system needs repair or a complete replacement?',
    answer:
      "If your unit is over 10–12 years old or requires frequent expensive repairs, a replacement is often the wisest option. Our owner Darrel and certified technicians like Tyler provide honest, zero-pressure assessments. We'll present clear choices and only recommend replacing when it represents the best long-term value for your environment.",
  },
  {
    id: 'sizing-calculation',
    question: 'How is the correct HVAC system size calculated for my home?',
    answer:
      'We perform rigorous Manual J load calculations matching the physical requirements of your desert home. We measure ceiling height, window placement, insulation, and home envelope. Under our ROC #327760 standards, we guarantee your system is perfectly sized for maximum cooling efficiency and moisture control.',
  },
  {
    id: 'firefighter-owned',
    question: 'What does it mean that you are Firefighter Owned and Operated?',
    answer:
      'As a firefighter-owned business, we operate under a strict code of honesty, safety, and community service. Our owner Darrel brings the same level of integrity, dedication, and precision required on the job directly to your home comfort needs. We never upsell or suggest unnecessary repairs.',
  },
  {
    id: 'warranties-financing',
    question: 'Do you offer emergency repairs, warranties, and financing options?',
    answer:
      'Yes. Our licensed technicians provide same-day emergency dispatch across Phoenix. All installations are backed by our signature warranty guarantees and are eligible for our promo 0% APR financing terms for up to 60 Months on qualifying systems.',
  },
];

export const FaqSection: React.FC = () => {
  // First item open by default matching the reference design
  const [openId, setOpenId] = useState<string | null>('tune-up-scope');

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faqs"
      className="w-full bg-[#F6F7FA] py-20 md:py-28 lg:py-32 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 transition-colors"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column — Header and Context */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-32">
            {/* Pill / Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-md bg-[#ECEEF2] text-[#6B7280] text-[13px] font-['Rinter'] font-medium tracking-wide mb-6">
              FAQs
            </div>

            {/* Main Section Heading */}
            <h2 className="text-4xl sm:text-5xl font-['SF_Pro'] font-bold text-[#121417] tracking-tight leading-[1.12] mb-5">
              Questions? Answers.
            </h2>

            {/* Subheading / Description */}
            <p className="text-[#6B7280] font-['Rinter'] text-base sm:text-lg leading-relaxed max-w-sm">
              Your most frequently asked questions, all in one place. If you don't see what you need, reach out to us.
            </p>
          </div>

          {/* Right Column — Accordion Cards Stack */}
          <div className="lg:col-span-7 flex flex-col space-y-3.5 w-full">
            {hvacFaqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl p-6 md:p-7 transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between text-left group focus:outline-none cursor-pointer"
                  >
                    <span className="font-['SF_Pro'] font-medium text-[17px] sm:text-[18px] text-[#121417] leading-snug pr-4 transition-colors group-hover:text-black">
                      {faq.question}
                    </span>

                    <span className="shrink-0 ml-2 w-7 h-7 flex items-center justify-center rounded-full text-zinc-500 group-hover:text-[#121417] transition-colors">
                      {isOpen ? (
                        <Minus className="w-5 h-5" strokeWidth={1.75} />
                      ) : (
                        <Plus className="w-5 h-5" strokeWidth={1.75} />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: 'auto',
                          opacity: 1,
                          transition: {
                            height: { duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] },
                            opacity: { duration: 0.22, delay: 0.05 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] },
                            opacity: { duration: 0.15 },
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <p className="font-['Rinter'] text-[#5A6270] text-[15px] sm:text-[15.5px] leading-relaxed pt-3.5 pr-8">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
