import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Compass, Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] items-center justify-center py-16 sm:py-24 bg-slate-50">
      <Container size="narrow">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-14 text-center shadow-lg shadow-slate-200/50">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-6 shadow-2xs">
            <Compass className="h-8 w-8 animate-pulse" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            404 — Page Not Found
          </span>

          <h1 className="mt-3 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Off the Map
          </h1>

          <p className="mt-4 text-base text-slate-600 max-w-md mx-auto leading-relaxed">
            The page you are looking for has been moved, renamed, or does not exist. Let’s get you back on course.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Button href="/" variant="primary" size="lg" className="w-full sm:w-auto shadow-md shadow-indigo-600/20">
              <Home className="h-4 w-4 mr-1.5" />
              <span>Back to Homepage</span>
            </Button>
            <Button href="/features" variant="outline" size="lg" className="w-full sm:w-auto">
              <span>Explore Features</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-center gap-6 text-xs text-slate-500">
            <Link href="/pricing" className="hover:text-indigo-600 transition-colors">
              Pricing Plans
            </Link>
            <Link href="/how-it-works" className="hover:text-indigo-600 transition-colors">
              How It Works
            </Link>
            <Link href="/request-demo" className="hover:text-indigo-600 transition-colors">
              Request Demo
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
