'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Mail, CheckCircle2, AlertCircle, Info, Loader2 } from 'lucide-react';
import { BRAND } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics/gtag';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'unconfigured' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMessage('');
    setFieldErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 200 && data.success) {
        setStatus('success');
        trackEvent('contact_form_success');
      } else if (res.status === 501 || data.status === 'unconfigured') {
        setStatus('unconfigured');
        setErrorMessage(data.message || 'Contact backend is awaiting webhook/mail configuration.');
      } else if (data.errors) {
        setStatus('error');
        setFieldErrors(data.errors);
        setErrorMessage('Please correct the highlighted fields.');
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Failed to send message.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network connection error. Please email us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 sm:mt-8 rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-sm">
      {status === 'success' ? (
        <div className="py-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-black text-slate-900">Message Sent</h3>
          <p className="mt-2 text-sm text-slate-600 max-w-sm mx-auto">
            Thank you for reaching out. Your message has been safely delivered to our support desk.
          </p>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          {status === 'unconfigured' && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 flex items-start gap-3">
              <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold">Service Notice</p>
                <p>{errorMessage}</p>
                <p className="text-amber-800">
                  Please contact us directly at{' '}
                  <a href={`mailto:${BRAND.contactEmail}`} className="underline font-semibold">
                    {BRAND.contactEmail}
                  </a>
                </p>
              </div>
            </div>
          )}

          {status === 'error' && errorMessage && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-800 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Unable to Deliver</p>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Anti-spam honeypot - visually hidden, ignored by legitimate users */}
          <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
            <label htmlFor="contactWebsite">Leave this field blank</label>
            <input
              id="contactWebsite"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Your Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Rahul Sharma"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
              {fieldErrors.name && (
                <p className="mt-1 text-xs text-rose-600">{fieldErrors.name[0]}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="rahul@agency.com"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-rose-600">{fieldErrors.email[0]}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Subject <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="e.g. Onboarding questions or feature inquiry"
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
            {fieldErrors.subject && (
              <p className="mt-1 text-xs text-rose-600">{fieldErrors.subject[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1.5">
              How can we help? <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="message"
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your travel agency and requirements..."
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
            {fieldErrors.message && (
              <p className="mt-1 text-xs text-rose-600">{fieldErrors.message[0]}</p>
            )}
          </div>

          <div className="space-y-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full justify-center shadow-md shadow-indigo-600/20"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <span>Send Message</span>
              )}
            </Button>
            <p className="text-center text-xs text-slate-500 leading-normal">
              By submitting this form, you acknowledge our{' '}
              <Link
                href="/privacy"
                className="text-indigo-600 font-medium underline hover:text-indigo-700 transition-colors"
              >
                Privacy Policy
              </Link>
              . We use your information to respond to your request.
            </p>
          </div>
        </form>
      )}

      <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-indigo-600" />
          <span>{BRAND.contactEmail}</span>
        </div>
        <div className="text-slate-400">
          Direct inquiry route
        </div>
      </div>
    </div>
  );
}
