'use client';

import type { LucideIcon } from 'lucide-react';

export type IconVariant = 'squircle' | 'pill' | 'technical' | 'badge' | 'glow' | 'minimal' | 'plain';
export type IconTone = 'blue' | 'navy' | 'cyan' | 'slate' | 'emerald';
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface CustomIconProps {
  icon?: LucideIcon;
  name?: string;
  variant?: IconVariant;
  tone?: IconTone;
  size?: IconSize;
  className?: string;
}

export function CustomIcon({ icon: FallbackIcon, name, variant = 'squircle', tone = 'blue', size = 'md', className = '' }: CustomIconProps) {
  const sizeMap: Record<IconSize, { container: string; icon: string; px: number }> = {
    xs: { container: 'w-7 h-7', icon: 'w-3.5 h-3.5', px: 16 },
    sm: { container: 'w-9 h-9', icon: 'w-4 h-4', px: 20 },
    md: { container: 'w-11 h-11', icon: 'w-6 h-6', px: 24 },
    lg: { container: 'w-14 h-14', icon: 'w-7 h-7', px: 28 },
    xl: { container: 'w-16 h-16', icon: 'w-8 h-8', px: 32 },
  };

  const toneMap: Record<IconTone, { bg: string; border: string; shadow: string; primary: string; secondary: string }> = {
    blue: { bg: 'bg-white', border: 'border-blue-100 group-hover:border-blue-300', shadow: 'shadow-sm', primary: '#1236E8', secondary: '#D7E2FF' },
    navy: { bg: 'bg-[#030A28]', border: 'border-white/10', shadow: 'shadow-md', primary: '#FFFFFF', secondary: '#20D9FF' },
    cyan: { bg: 'bg-white', border: 'border-cyan-100', shadow: 'shadow-sm', primary: '#0695B8', secondary: '#CFFAFE' },
    slate: { bg: 'bg-white', border: 'border-slate-200', shadow: 'shadow-sm', primary: '#334155', secondary: '#E2E8F0' },
    emerald: { bg: 'bg-white', border: 'border-emerald-100', shadow: 'shadow-sm', primary: '#059669', secondary: '#D1FAE5' },
  };

  const currentSize = sizeMap[size];
  const currentTone = toneMap[tone];
  const shapeClass = variant === 'pill' ? 'rounded-full' : variant === 'minimal' ? 'rounded-lg' : 'rounded-xl';
  const iconKey = (name || (FallbackIcon ? (FallbackIcon.displayName || FallbackIcon.name || '') : '')).toLowerCase();

  if (variant === 'plain' && FallbackIcon) {
    return <FallbackIcon className={`${currentSize.icon} ${className}`} />;
  }

  const s = currentSize.px;
  const p = currentTone.primary;
  const sec = currentTone.secondary;

  const renderSvg = () => {
    if (iconKey.includes('search')) return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="10.5" cy="10.5" r="7.5" fill={sec} /><circle cx="10.5" cy="10.5" r="7.5" stroke={p} strokeWidth="2.2" /><path d="M7.5 8C8.2 6.8 9.5 6 11 6" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" /><path d="M16 16L21 21" stroke={p} strokeWidth="2.6" strokeLinecap="round" /></svg>
    );
    if (iconKey.includes('shield') || iconKey.includes('security')) return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 2.5L19.5 6V11.5C19.5 16.5 16.3 20 12 21.5C7.7 20 4.5 16.5 4.5 11.5V6L12 2.5Z" fill={sec} stroke={p} strokeWidth="2" strokeLinejoin="round" /><path d="M12 7.5V14.5M8.5 11H15.5" stroke={p} strokeWidth="2.2" strokeLinecap="round" /></svg>
    );
    if (iconKey.includes('target')) return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill={sec} stroke={p} strokeWidth="2" /><circle cx="12" cy="12" r="5.5" stroke="#FFFFFF" strokeWidth="1.8" /><circle cx="12" cy="12" r="3" fill={p} /></svg>
    );
    if (iconKey.includes('trending') || iconKey.includes('activity')) return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M4 17L10 11L14 15L20 7V17H4Z" fill={sec} opacity="0.7" /><path d="M4 17L10 11L14 15L20 7" stroke={p} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M15 7H20V12" stroke={p} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
    );
    if (iconKey.includes('barchart') || iconKey.includes('analytics')) return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="4" y="12" width="3.8" height="8" rx="1.5" fill={sec} stroke={p} strokeWidth="1.5" /><rect x="10.1" y="7" width="3.8" height="13" rx="1.5" fill={p} /><rect x="16.2" y="3" width="3.8" height="17" rx="1.5" fill={sec} stroke={p} strokeWidth="1.5" /><path d="M2.5 21H21.5" stroke={p} strokeWidth="2" strokeLinecap="round" /></svg>
    );
    if (iconKey.includes('sparkle') || iconKey.includes('star')) return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z" fill={p} /><path d="M19 16L19.8 18.2L22 19L19.8 19.8L19 22L18.2 19.8L16 19L18.2 18.2L19 16Z" fill={sec} /></svg>
    );
    if (FallbackIcon) return <FallbackIcon className={currentSize.icon} />;
    return null;
  };

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <div className={`relative ${currentSize.container} ${shapeClass} ${currentTone.bg} border ${currentTone.border} ${currentTone.shadow} flex items-center justify-center transition-all duration-200 group-hover:scale-105`}>
        {renderSvg()}
      </div>
    </div>
  );
}
