import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import {
  ChevronRight,
  ChevronDown,
  Star,
  CheckCircle2,
  Calendar,
  FileCheck,
} from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 sm:pt-12 lg:pt-14 pb-0 bg-[#F9F9F6]">
      <Container size="default">
        {/* Centered Editorial Header (Locked to 2 Lines on Desktop matching Perk) */}
        <div className="max-w-5xl lg:max-w-6xl mx-auto text-center">
          <h1 className="text-[24px] xs:text-[28px] sm:text-5xl lg:text-[70px] xl:text-[76px] font-black tracking-tight text-slate-950 leading-[1.14] sm:leading-[1.05] break-words">
            Automate travel, itineraries,<br className="hidden sm:inline" /> and bookings in one platform
          </h1>

          {/* Review / Social Proof Rating Strip (Perk Style: Crisp Dark Stars) */}
          <div className="mt-3.5 sm:mt-5 flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm font-semibold text-slate-900">
            {/* Circular G Badge */}
            <div className="h-4 w-4 sm:h-4.5 sm:w-4.5 rounded-full border border-slate-900 flex items-center justify-center text-[9px] sm:text-[10px] font-black text-slate-900 shrink-0">
              G
            </div>
            {/* 5 Solid Dark Stars */}
            <div className="flex items-center gap-0.5 text-slate-950">
              <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-slate-950 text-slate-950 shrink-0" />
              <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-slate-950 text-slate-950 shrink-0" />
              <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-slate-950 text-slate-950 shrink-0" />
              <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-slate-950 text-slate-950 shrink-0" />
              <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-slate-950 text-slate-950 shrink-0" />
            </div>
            <span className="font-bold text-slate-900 tracking-tight">+100 reviews</span>
          </div>

          {/* Dual Pill Action Buttons (Brand Logo Color Combination: Indigo-600 + Slate White Pill) */}
          <div className="mt-5 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5">
            <Link
              href="/request-demo"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-base font-bold shadow-md shadow-indigo-600/25 transition-all w-full sm:w-auto"
            >
              <span>Book a demo</span>
              <ChevronRight className="h-4 w-4 stroke-[2.5]" />
            </Link>
            <a
              href="#product-overview"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-900 border border-slate-300 px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-base font-bold shadow-xs transition-all w-full sm:w-auto"
            >
              <span>Explore our product</span>
              <ChevronDown className="h-4 w-4 stroke-[2.5] text-slate-500" />
            </a>
          </div>
        </div>

        {/* Device Showcase (1300px max container with Laptop SaaS Dashboard + Overlapping Phone & Quotations Card) */}
        <div className="mt-10 sm:mt-12 lg:mt-14 max-w-[1240px] mx-auto relative">
          {/* Main Desktop / Laptop Frame */}
          <div className="relative mx-auto rounded-t-[20px] sm:rounded-t-[34px] border-t-[6px] sm:border-t-[12px] border-x-[4px] sm:border-x-[12px] border-slate-900 bg-slate-900 shadow-2xl overflow-hidden ring-1 ring-slate-950/20">
            {/* Camera Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 h-2.5 sm:h-3.5 w-20 sm:w-36 rounded-b-xl bg-slate-900 flex items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-slate-700" />
            </div>

            {/* Laptop Browser Header Bar */}
            <div className="flex h-9 sm:h-11 items-center justify-between border-b border-slate-800 bg-slate-900 px-3 sm:px-4 text-xs">
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </div>
              <div className="hidden xs:block rounded-full bg-slate-800/90 px-3 py-1 font-mono text-[10px] sm:text-[11px] text-slate-300 border border-slate-700/60 truncate max-w-[170px] sm:max-w-none">
                app.yourtraveldesk.in/dashboard
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 shrink-0">
                Live • Agency Suite
              </span>
            </div>

            {/* Laptop Screen Content: Real SaaS Product Screenshot */}
            <div className="relative aspect-[16/9.6] w-full bg-slate-950 overflow-hidden">
              <Image
                src="/screenshots/dashboard.png"
                alt="Your Travel Desk Executive Dashboard Overview"
                fill
                priority
                sizes="(max-width: 1300px) 100vw, 1300px"
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* Overlapping SaaS Feature Card (Replacing Visa Card with Real SaaS Quotations Image) */}
          <div className="hidden lg:block absolute -right-3 lg:-right-8 bottom-8 lg:bottom-12 rounded-2xl bg-white p-3 shadow-2xl z-10 w-72 sm:w-80 lg:w-[360px] border border-slate-200/90 ring-1 ring-slate-900/10">
            <div className="flex items-center justify-between px-2 py-1.5 border-b border-slate-100 mb-2">
              <div className="flex items-center gap-1.5">
                <FileCheck className="h-4 w-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-900 tracking-tight">Quotations & Proposals</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                18 Generated
              </span>
            </div>
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
              <Image
                src="/screenshots/quotations.png"
                alt="Your Travel Desk Quotations and Pricing Proposals"
                fill
                sizes="360px"
                className="object-cover object-top"
              />
            </div>
            <div className="mt-2.5 px-1 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Commercial Client Snapshot</span>
              <span className="font-black text-indigo-600 font-mono">₹1,11,203</span>
            </div>
          </div>

          {/* Overlapping Smartphone Device Frame (Perk-Style Mobile Itinerary Pass) */}
          <div className="hidden sm:block absolute right-6 sm:right-16 lg:right-36 -bottom-4 lg:-bottom-6 w-56 sm:w-64 rounded-[36px] border-[7px] border-slate-900 bg-white shadow-2xl overflow-hidden z-20 ring-1 ring-slate-900/10">
            {/* Dynamic Island Notch */}
            <div className="bg-slate-950 pt-2 pb-1.5 px-4 flex justify-center">
              <div className="h-3 w-16 bg-black rounded-full" />
            </div>

            {/* Mobile App Header */}
            <div className="px-3.5 py-2.5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Active Tour</p>
                <p className="text-xs font-black text-slate-900">Kerala Explorer • 5D</p>
              </div>
              <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                Confirmed
              </span>
            </div>

            {/* Mobile App Content */}
            <div className="p-3 space-y-2 bg-white text-[11px]">
              <div className="rounded-xl border border-slate-100 bg-[#FAFAF8] p-2.5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500">Taj Gateway Cochin</p>
                  <p className="font-bold text-slate-900">2x Deluxe Suite</p>
                </div>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>

              <div className="rounded-xl border border-slate-100 bg-[#FAFAF8] p-2.5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500">Munnar Tea Valley</p>
                  <p className="font-bold text-slate-900">Private Innova Cab</p>
                </div>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>

              {/* Bottom Brand Action Pill */}
              <div className="pt-1">
                <div className="rounded-full bg-indigo-600 text-white text-center py-2 font-bold text-xs shadow-xs flex items-center justify-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Vouchers Issued • Day 1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Horizontal Trust Banner (Perk Style: Full Width Grey Strip + Clean Monochrome Logos) */}
      {/* <div className="mt-8 sm:mt-12 border-t border-slate-200/80 bg-[#E8E7E2] py-4 sm:py-5">
        <Container size="default">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-600">
            <span className="text-slate-600 font-bold tracking-tight text-center lg:text-left text-xs sm:text-sm">
              Trusted by 1,000s of global teams
            </span>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-10 text-slate-700 font-bold">
              <span className="tracking-tight hover:text-slate-950 transition-colors">Betterment</span>
              <span className="tracking-tight hover:text-slate-950 transition-colors">The Motley Fool</span>
              <span className="tracking-tight font-black hover:text-slate-950 transition-colors text-sm">On</span>
              <span className="tracking-tight hover:text-slate-950 transition-colors">TeamViewer</span>
              <span className="tracking-widest uppercase text-[11px] hover:text-slate-950 transition-colors">GET YOUR GUIDE</span>
              <span className="tracking-tight hover:text-slate-950 transition-colors">Nordcloud</span>
              <span className="tracking-tighter font-black text-sm hover:text-slate-950 transition-colors">7wise</span>
            </div>
          </div>
        </Container>
      </div> */}
    </section>
  );
}
