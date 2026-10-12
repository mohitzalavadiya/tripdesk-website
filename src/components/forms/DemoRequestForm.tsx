'use client';

import React, { useState } from 'react';
import { trackEvent } from '@/lib/analytics/gtag';
import { BRAND } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, AlertCircle, Info, Loader2 } from 'lucide-react';

interface FormState {
  fullName: string;
  workEmail: string;
  phone: string;
  agencyName: string;
  monthlyBookings: string;
  primaryRequirement: string;
  marketingConsent: boolean;
  website: string;
}

export function DemoRequestForm() {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    workEmail: '',
    phone: '',
    agencyName: '',
    monthlyBookings: '10_to_50',
    primaryRequirement: '',
    marketingConsent: false,
    website: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'unconfigured' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMessage('');
    setFieldErrors({});

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 200 && data.success) {
        setStatus('success');
        trackEvent('demo_form_success', { bookings_tier: formData.monthlyBookings });
      } else if (res.status === 501 || data.status === 'unconfigured') {
        setStatus('unconfigured');
        setErrorMessage(data.message || 'Demo backend is not yet connected.');
      } else if (data.errors) {
        setStatus('error');
        setFieldErrors(data.errors);
        setErrorMessage('Please review the highlighted fields below.');
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Failed to submit demo request.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error occurred. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-8 text-center sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-black text-slate-900">Demo Request Received</h3>
        <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
          Thank you for your interest in {BRAND.name}. A product specialist will review your agency workflow and reach out to schedule your personalized demonstration.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      {status === 'unconfigured' && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 flex items-start gap-3">
          <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">Backend Integration Notice</p>
            <p>{errorMessage}</p>
            <p className="text-amber-700">
              Direct Contact: <a href={`mailto:${BRAND.contactEmail}`} className="underline font-semibold">{BRAND.contactEmail}</a>
            </p>
          </div>
        </div>
      )}

      {status === 'error' && errorMessage && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-800 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Submission Incomplete</p>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Anti-spam honeypot - visually hidden, ignored by legitimate users */}
      <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
        <label htmlFor="demoWebsite">Leave this field blank</label>
        <input
          id="demoWebsite"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="e.g. Rahul Sharma"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
          {fieldErrors.fullName && (
            <p className="mt-1 text-xs text-rose-600">{fieldErrors.fullName[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="workEmail" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Work Email <span className="text-rose-500">*</span>
          </label>
          <input
            id="workEmail"
            type="email"
            required
            value={formData.workEmail}
            onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
            placeholder="rahul@agencynametravels.com"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
          {fieldErrors.workEmail && (
            <p className="mt-1 text-xs text-rose-600">{fieldErrors.workEmail[0]}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="agencyName" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Agency / Business Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="agencyName"
            type="text"
            required
            value={formData.agencyName}
            onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
            placeholder="e.g. Apex Holidays"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
          {fieldErrors.agencyName && (
            <p className="mt-1 text-xs text-rose-600">{fieldErrors.agencyName[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 98765 43210"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>
      </div>

      <div>
        <label htmlFor="monthlyBookings" className="block text-xs font-semibold text-slate-700 mb-1.5">
          Approx. Monthly Bookings / Trips
        </label>
        <select
          id="monthlyBookings"
          value={formData.monthlyBookings}
          onChange={(e) => setFormData({ ...formData, monthlyBookings: e.target.value })}
          className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
        >
          <option value="under_10">Under 10 trips / month (Starting out)</option>
          <option value="10_to_50">10 to 50 trips / month (Growing agency)</option>
          <option value="50_to_200">50 to 200 trips / month (Established operator)</option>
          <option value="over_200">200+ trips / month (High volume DMC)</option>
        </select>
      </div>

      <div>
        <label htmlFor="primaryRequirement" className="block text-xs font-semibold text-slate-700 mb-1.5">
          Current Pain Points or Specific Requirements <span className="text-slate-400 font-normal">(Optional)</span>
        </label>
        <textarea
          id="primaryRequirement"
          rows={3}
          value={formData.primaryRequirement}
          onChange={(e) => setFormData({ ...formData, primaryRequirement: e.target.value })}
          placeholder="e.g. Currently tracking trips in Excel and lost quotes in WhatsApp. Looking to streamline quotation generation and payment ledgers."
          className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
        />
      </div>

      <div className="flex items-start gap-2.5 pt-1">
        <input
          id="marketingConsent"
          type="checkbox"
          checked={formData.marketingConsent}
          onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
          className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 mt-0.5"
        />
        <label htmlFor="marketingConsent" className="text-xs text-slate-500 leading-normal">
          I agree to receive occasional product updates and agency operation guides from {BRAND.name}. You can unsubscribe at any time.
        </label>
      </div>

      <div className="pt-2">
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
              <span>Submitting Request...</span>
            </>
          ) : (
            <span>Request Personalized Walkthrough</span>
          )}
        </Button>
      </div>
    </form>
  );
}
