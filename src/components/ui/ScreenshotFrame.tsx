import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FloatingChip {
  label: string;
  sublabel?: string;
  icon?: LucideIcon;
  position?: 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right';
}

interface ScreenshotFrameProps {
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  badge?: string;
  aspectRatio?: 'video' | 'wide' | 'tall' | 'auto';
  floatingChips?: FloatingChip[];
  className?: string;
  children?: React.ReactNode;
}

export function ScreenshotFrame({
  imageSrc,
  imageAlt = 'Your Travel Desk product interface',
  title,
  subtitle,
  icon: Icon,
  badge,
  aspectRatio = 'video',
  floatingChips,
  className,
  children,
}: ScreenshotFrameProps) {
  const aspectClasses = {
    video: 'aspect-[16/10]',
    wide: 'aspect-[16/9]',
    tall: 'aspect-[4/3]',
    auto: 'min-h-[340px] sm:min-h-[420px]',
  }[aspectRatio];

  const pathSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-900/5 p-2 sm:p-2.5 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/10',
        className
      )}
    >
      {/* Window Top Bar / Browser Shell */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
        <div className="flex h-10 items-center justify-between border-b border-slate-200/80 bg-slate-50/90 px-2.5 sm:px-4 gap-2">
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-300 group-hover:bg-rose-400 transition-colors shrink-0" />
            <div className="h-2.5 w-2.5 rounded-full bg-slate-300 group-hover:bg-amber-400 transition-colors shrink-0" />
            <div className="h-2.5 w-2.5 rounded-full bg-slate-300 group-hover:bg-emerald-400 transition-colors shrink-0" />
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 rounded-md bg-white px-2 sm:px-3.5 py-1 text-[10px] sm:text-[11px] font-medium text-slate-600 border border-slate-200 shadow-2xs min-w-0 max-w-[140px] sm:max-w-none">
            {Icon ? (
              <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-indigo-600 shrink-0" />
            ) : (
              <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500 shrink-0" />
            )}
            <span className="font-mono text-slate-500 truncate">app.yourtraveldesk.in/{pathSlug}</span>
          </div>

          {badge ? (
            <span className="hidden sm:inline-flex text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2.5 py-0.5 rounded-full shrink-0">
              {badge}
            </span>
          ) : (
            <div className="w-6 sm:w-12 shrink-0" />
          )}
        </div>

        {/* Content Area */}
        <div className={cn('relative w-full overflow-hidden bg-slate-100', aspectClasses)}>
          {imageSrc ? (
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                priority={false}
              />

              {/* Floating interactive chips */}
              {floatingChips && floatingChips.length > 0 && (
                <div className="pointer-events-none absolute inset-0 p-3 sm:p-4 hidden sm:flex flex-col justify-between">
                  {floatingChips.map((chip, idx) => {
                    const ChipIcon = chip.icon;
                    const posClass =
                      chip.position === 'top-right'
                        ? 'self-end'
                        : chip.position === 'bottom-left'
                        ? 'self-start mt-auto'
                        : chip.position === 'top-left'
                        ? 'self-start'
                        : 'self-end mt-auto';

                    return (
                      <div
                        key={idx}
                        className={cn(
                          'inline-flex items-center gap-2.5 rounded-xl border border-white/80 bg-white/95 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-slate-800 shadow-lg shadow-slate-950/10 backdrop-blur-md transition-transform duration-300 group-hover:scale-105',
                          posClass
                        )}
                      >
                        {ChipIcon && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                            <ChipIcon className="h-3.5 w-3.5" />
                          </div>
                        )}
                        <div className="leading-tight">
                          <p className="font-bold text-slate-900">{chip.label}</p>
                          {chip.sublabel && (
                            <p className="text-[10px] text-slate-500">{chip.sublabel}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full w-full flex-col justify-between p-6 sm:p-8 bg-slate-50/60">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    {Icon ? <Icon className="h-5 w-5" /> : <div className="h-4 w-4 rounded-sm bg-indigo-600" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{title}</h4>
                    {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
                  </div>
                </div>
              </div>

              {children}

              <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 text-[11px] text-slate-400">
                <span>Your Travel Desk Operating System</span>
                <span className="text-indigo-600 font-medium">Verified Module</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
