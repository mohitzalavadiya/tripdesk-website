'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FaqItem } from '@/types';

interface FaqAccordionProps {
  items: FaqItem[];
  allowMultiple?: boolean;
  className?: string;
}

export function FaqAccordion({
  items,
  allowMultiple = false,
  className,
}: FaqAccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleIndex = (index: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={cn('divide-y divide-slate-200 border-y border-slate-200', className)}>
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        const headingId = `faq-heading-${index}`;
        const panelId = `faq-panel-${index}`;

        return (
          <div key={index} className="py-5">
            <button
              id={headingId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggleIndex(index)}
              className="flex w-full items-center justify-between gap-4 text-left font-semibold text-[#0F172A] hover:text-[#4F46E5] transition-colors focus-visible:outline-2 focus-visible:outline-[#4F46E5] focus-visible:outline-offset-2 rounded-sm"
            >
              <span className="text-base sm:text-lg">{item.question}</span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200',
                  isOpen && 'rotate-180 text-[#4F46E5]'
                )}
                aria-hidden="true"
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              hidden={!isOpen}
              className={cn(
                'pt-3 text-sm sm:text-base text-[#475569] leading-relaxed transition-all',
                isOpen ? 'block' : 'hidden'
              )}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
