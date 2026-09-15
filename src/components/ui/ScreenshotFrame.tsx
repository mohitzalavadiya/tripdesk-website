import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ScreenshotFrameProps {
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  badge?: string;
  aspectRatio?: 'video' | 'wide' | 'auto';
  className?: string;
  children?: React.ReactNode;
}

export function ScreenshotFrame({
  imageSrc,
  imageAlt = 'TripDesk product interface',
  title,
  subtitle,
  icon: Icon,
  badge,
  aspectRatio = 'video',
  className,
  children,
}: ScreenshotFrameProps) {
  const aspectClasses = {
    video: 'aspect-[16/10]',
    wide: 'aspect-[16/9]',
    auto: 'min-h-[340px] sm:min-h-[420px]',
  }[aspectRatio];

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-900/5 p-2 sm:p-3 shadow-xl ring-1 ring-slate-950/5',
        className
      )}
    >
      {/* Window Top Bar / Browser Shell */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex h-9 items-center justify-between border-b border-slate-200 bg-slate-50/80 px-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          </div>

          <div className="flex items-center gap-2 rounded-md bg-white px-3 py-1 text-[11px] font-medium text-slate-500 border border-slate-200/60 shadow-2xs">
            {Icon && <Icon className="h-3.5 w-3.5 text-[#4F46E5]" />}
            <span>app.tripdesk.com/{title.toLowerCase().replace(/\s+/g, '-')}</span>
          </div>

          {badge ? (
            <span className="text-[10px] font-semibold text-[#4F46E5] bg-indigo-50 px-2 py-0.5 rounded-full">
              {badge}
            </span>
          ) : (
            <div className="w-10" />
          )}
        </div>

        {/* Content Area (Image or Clean Placeholder Frame) */}
        <div className={cn('relative w-full overflow-hidden bg-slate-50/40', aspectClasses)}>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top"
              priority={false}
            />
          ) : (
            <div className="flex h-full w-full flex-col justify-between p-6 sm:p-8">
              {/* Top internal header placeholder */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-[#4F46E5]">
                    {Icon ? <Icon className="h-5 w-5" /> : <div className="h-4 w-4 rounded-sm bg-[#4F46E5]" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A]">{title}</h4>
                    {subtitle && <p className="text-xs text-[#475569]">{subtitle}</p>}
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <div className="h-7 w-20 rounded-md bg-slate-200/70" />
                  <div className="h-7 w-24 rounded-md bg-[#4F46E5]/10" />
                </div>
              </div>

              {/* Body visual content */}
              {children ? (
                children
              ) : (
                <div className="my-auto space-y-3 py-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-16 rounded-lg border border-slate-200/80 bg-white p-3 shadow-2xs">
                      <div className="h-2 w-12 rounded bg-slate-200 mb-2" />
                      <div className="h-4 w-16 rounded bg-indigo-100" />
                    </div>
                    <div className="h-16 rounded-lg border border-slate-200/80 bg-white p-3 shadow-2xs">
                      <div className="h-2 w-12 rounded bg-slate-200 mb-2" />
                      <div className="h-4 w-16 rounded bg-slate-200" />
                    </div>
                    <div className="h-16 rounded-lg border border-slate-200/80 bg-white p-3 shadow-2xs">
                      <div className="h-2 w-12 rounded bg-slate-200 mb-2" />
                      <div className="h-4 w-16 rounded bg-slate-200" />
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200/80 bg-white p-4 shadow-2xs space-y-2.5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="h-3 w-28 rounded bg-slate-300" />
                      <div className="h-3 w-16 rounded bg-slate-200" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="h-2.5 w-36 rounded bg-slate-200" />
                      <div className="h-2.5 w-12 rounded bg-emerald-100" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="h-2.5 w-44 rounded bg-slate-200" />
                      <div className="h-2.5 w-12 rounded bg-slate-200" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="h-2.5 w-32 rounded bg-slate-200" />
                      <div className="h-2.5 w-12 rounded bg-indigo-100" />
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom footer bar */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 text-[11px] text-slate-400">
                <span>TripDesk Operating System</span>
                <span className="text-[#4F46E5] font-medium">Live Module Preview</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
