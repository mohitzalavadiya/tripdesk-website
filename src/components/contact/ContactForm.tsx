'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Mail, MessageSquare, CheckCircle2 } from 'lucide-react';

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      {isSubmitted ? (
        <div className="py-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-[#4F46E5] mb-4">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0F172A]">Thank you for reaching out!</h3>
          <p className="mt-2 text-sm text-[#475569] max-w-sm mx-auto">
            We have received your demo inquiry and will contact you within 24 business hours.
          </p>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Jane Doe"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-[#0F172A] placeholder-slate-400 focus:border-[#4F46E5] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="jane@agency.com"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-[#0F172A] placeholder-slate-400 focus:border-[#4F46E5] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="agency" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Agency / Company Name
            </label>
            <input
              type="text"
              id="agency"
              name="agency"
              required
              placeholder="Atlas Travel Co."
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-[#0F172A] placeholder-slate-400 focus:border-[#4F46E5] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              How can we help?
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Tell us about your agency size and current workflow needs..."
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-[#0F172A] placeholder-slate-400 focus:border-[#4F46E5] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
            />
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full justify-center">
            Submit Request
          </Button>
        </form>
      )}

      <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#475569]">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-[#4F46E5]" />
          <span>support@tripdesk.com</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-[#4F46E5]" />
          <span>We reply within 24 business hours</span>
        </div>
      </div>
    </div>
  );
}
