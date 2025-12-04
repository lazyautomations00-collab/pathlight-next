"use client";
import React, { useEffect } from 'react';
import { ArrowLeft, Scale, CheckCircle, AlertTriangle } from 'lucide-react';
import { Logo } from './Logo';

interface Props {
  onBack: () => void;
}

const TermsOfService: React.FC<Props> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
            <div className="text-primary">
                <Logo className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">Pathlight</span>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-slate-500 mb-8">Last updated: March 15, 2024</p>

        <div className="space-y-12">
          {/* Intro */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Agreement to Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              By accessing or using Pathlight, you agree to be bound by these Terms of Service. If you do not agree to these terms, including the mandatory arbitration provision and class action waiver, you may not access or use the services.
            </p>
          </div>

          {/* Usage */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={24} /> Acceptable Use
            </h2>
            <p className="text-slate-600 mb-4">
                You agree not to misuse the Pathlight services. You must not:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Reverse engineer the AI', 'Upload malicious code', 'Harass other users', 'Violate school policies'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700 bg-white p-3 rounded-lg border border-slate-100">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> {item}
                    </li>
                ))}
            </ul>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="text-orange-500" size={24} /> Medical Disclaimer
            </h2>
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
                <p className="text-orange-900 font-medium leading-relaxed">
                    Pathlight is an AI-powered support tool, NOT a replacement for professional medical advice, diagnosis, or treatment. In a medical emergency, dial 911 immediately.
                </p>
            </div>
          </section>

           {/* Termination */}
           <section>
            <h2 className="text-2xl font-bold mb-4">Termination</h2>
            <p className="text-slate-600 leading-relaxed">
              We reserve the right to suspend or terminate your access to Pathlight at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
            </p>
          </section>
        </div>
      </div>
      
      <div className="border-t border-slate-200 bg-white py-8 text-center text-slate-500 text-sm">
        &copy; 2024 Pathlight AI Inc. All rights reserved.
      </div>
    </div>
  );
};

export default TermsOfService;
