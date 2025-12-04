"use client";


import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Lock, Eye, FileText } from 'lucide-react';
import { Logo } from './Logo';

interface Props {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<Props> = ({ onBack }) => {
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
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-slate-500 mb-8">Last updated: March 15, 2024</p>

        <div className="prose prose-slate max-w-none space-y-12">
          {/* Section 1 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg text-primary">
                <Lock size={24} />
              </div>
              <h2 className="text-2xl font-bold m-0">1. Data Collection & Usage</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Pathlight is committed to protecting the privacy of students and schools. We collect minimal data necessary to provide our counseling services. 
              This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-600">
              <li><strong>Account Information:</strong> If you create an account, we collect your email and an encrypted password.</li>
              <li><strong>Chat Logs:</strong> Conversations with the AI Avatar are processed to provide responses but are anonymized and encrypted at rest.</li>
              <li><strong>Usage Metrics:</strong> We track session duration and feature usage to improve service quality.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg text-primary">
                <Eye size={24} />
              </div>
              <h2 className="text-2xl font-bold m-0">2. FERPA & COPPA Compliance</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              We operate in strict compliance with the Family Educational Rights and Privacy Act (FERPA) and the Children's Online Privacy Protection Act (COPPA).
            </p>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 mt-6 shadow-sm">
                <h3 className="font-bold text-lg mb-2">Student Safety First</h3>
                <p className="text-slate-600 text-sm">
                    We do not sell student data to third parties. Data is only shared with school administrators in the event of a flagged safety risk (e.g., self-harm detection) as per our safety protocols.
                </p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg text-primary">
                <FileText size={24} />
              </div>
              <h2 className="text-2xl font-bold m-0">3. Your Rights</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Users have the right to request access to, correction of, or deletion of their personal data. Schools retain ownership of all student records generated through the platform.
            </p>
          </section>

           <section className="bg-slate-900 text-white p-8 rounded-3xl mt-12">
            <h2 className="text-xl font-bold mb-4">Contact Our Data Protection Officer</h2>
            <p className="opacity-80 mb-6">If you have specific questions about our data practices.</p>
            <button className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold text-sm hover:bg-slate-100 transition-colors">
                Contact Privacy Team
            </button>
          </section>
        </div>
      </div>
      
      <div className="border-t border-slate-200 bg-white py-8 text-center text-slate-500 text-sm">
        &copy; 2024 Pathlight AI Inc. All rights reserved.
      </div>
    </div>
  );
};

export default PrivacyPolicy;
