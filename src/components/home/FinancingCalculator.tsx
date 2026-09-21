import React, { useState, useId } from 'react';
import { Zap, Shield, CalendarCheck, Lock } from 'lucide-react';

export const FinancingCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(4200);
  const [termMonths, setTermMonths] = useState<number>(48);
  const sliderId = useId();

  // Calculation Logic
  const principal = loanAmount;
  const n = termMonths;
  const monthlyPayment = Math.round(principal / n);

  return (
    <section id="finance" className="w-full bg-white py-16 px-[10px] font-['Delight'] border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-[#2934ce] font-medium mb-2 text-center">
            Flexible payment options
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium text-gray-900 text-center mb-2 font-['Nohemi'] leading-tight tracking-tight">
            Don't let cost stop your comfort
          </h2>
          <p className="text-sm text-gray-500 text-center">
            Get the system you need today — pay on your terms
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column — Interactive Calculator */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-5">
              Estimate your monthly payment
            </p>

            {/* Input 1 — Total project cost */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={sliderId} className="text-sm text-gray-600">
                  Total project cost
                </label>
              </div>

              <div className="text-center my-3">
                <span className="text-3xl font-medium text-[#2934ce] font-['Nohemi']">
                  ${loanAmount.toLocaleString('en-US')}
                </span>
              </div>

              <input
                id={sliderId}
                type="range"
                min={1000}
                max={15000}
                step={100}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2934ce]"
              />

              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>$1,000</span>
                <span>$15,000</span>
              </div>
            </div>

            {/* Input 2 — Loan term */}
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">
                Loan term
              </label>
              <div className="flex gap-2">
                {[24, 48, 60].map((term) => {
                  const isSelected = termMonths === term;
                  return (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setTermMonths(term)}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-2 border-[#2934ce] bg-[#2934ce]/10 text-[#2934ce] font-medium shadow-xs'
                          : 'border border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {term} months
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input 3 — APR display (not editable) */}
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">
                Interest rate (APR)
              </label>
              <span className="bg-[#FE552F] text-white text-sm px-3 py-1 rounded-full inline-block font-semibold">
                0% APR
              </span>
            </div>

            <div className="border-t border-gray-100 my-5" />

            {/* Monthly payment result */}
            <div className="text-left">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                Estimated monthly payment
              </p>
              <div className="text-4xl font-medium text-[#2934ce] font-['Nohemi'] transition-all">
                ${monthlyPayment.toLocaleString('en-US')}/mo
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Based on ${loanAmount.toLocaleString('en-US')} at 0% APR over {termMonths} months
              </p>
            </div>

            {/* CTA button */}
            <button
              type="button"
              className="w-full bg-[#2934ce] hover:bg-[#2029ad] text-white rounded-xl py-3 text-sm font-medium mt-4 transition-colors cursor-pointer shadow-sm active:scale-[0.99]"
            >
              Apply now — no hard credit pull
            </button>

            {/* Fine print */}
            <p className="text-xs text-gray-400 text-center mt-2">
              Rates shown are estimates. Subject to credit approval. 0% APR available on qualifying systems.
            </p>
          </div>

          {/* Right Column — Benefits + Partner Logos */}
          <div className="flex flex-col gap-5">
            {/* Benefit cards */}
            <div className="bg-[#2934ce]/[0.06] border border-[#2934ce]/20 rounded-xl p-4 flex items-start gap-3">
              <Zap className="w-5 h-5 text-[#2934ce] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-[#121417]">
                  0% APR Promo Financing
                </h3>
                <p className="text-xs text-[#2934ce] mt-0.5">
                  Available for up to 60 Months on qualifying systems
                </p>
              </div>
            </div>

            <div className="bg-[#2934ce]/[0.06] border border-[#2934ce]/20 rounded-xl p-4 flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#2934ce] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-[#121417]">
                  No prepayment penalties
                </h3>
                <p className="text-xs text-[#2934ce] mt-0.5">
                  Pay it off early anytime with no fees
                </p>
              </div>
            </div>

            <div className="bg-[#2934ce]/[0.06] border border-[#2934ce]/20 rounded-xl p-4 flex items-start gap-3">
              <CalendarCheck className="w-5 h-5 text-[#2934ce] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-[#121417]">
                  Flexible terms up to 60 months
                </h3>
                <p className="text-xs text-[#2934ce] mt-0.5">
                  Choose the monthly payment budget that fits you best
                </p>
              </div>
            </div>

            {/* Partner logos section */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-2 mb-3">
                Financing provided by
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-gray-200 rounded-lg py-3 px-4 text-center text-sm font-medium text-gray-500 bg-white hover:border-gray-300 transition-colors">
                  Synchrony Financial
                </div>
                <div className="border border-gray-200 rounded-lg py-3 px-4 text-center text-sm font-medium text-gray-500 bg-white hover:border-gray-300 transition-colors">
                  GreenSky
                </div>
                <div className="border border-gray-200 rounded-lg py-3 px-4 text-center text-sm font-medium text-gray-500 bg-white hover:border-gray-300 transition-colors">
                  Service Finance
                </div>
                <div className="border border-gray-200 rounded-lg py-3 px-4 text-center text-sm font-medium text-gray-500 bg-white hover:border-gray-300 transition-colors">
                  FTL Finance
                </div>
              </div>
            </div>

            {/* Bottom trust note */}
            <div className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 mt-2 flex items-start gap-3">
              <Lock className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <p className="text-xs text-gray-500">
                Your information is secure. Checking your rate won't affect your credit score.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
