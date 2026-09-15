import { ReactNode } from 'react';

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon?: ReactNode;
  tag?: string;
}
