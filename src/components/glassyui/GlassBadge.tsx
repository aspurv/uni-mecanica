import clsx from 'clsx';
import React, { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

export type GlassBadgeTone = 'neutral' | 'blue' | 'green' | 'orange' | 'red' | 'purple';

export interface GlassBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  dot?: boolean;
  tone?: GlassBadgeTone;
}

export const GlassBadge = forwardRef<HTMLSpanElement, GlassBadgeProps>(
  ({ children, className, dot = false, tone = 'neutral', ...props }, forwardedRef) => (
    <span
      ref={forwardedRef}
      data-tone={tone}
      className={clsx('lg-badge', className)}
      {...props}
    >
      {dot && <span aria-hidden className="lg-badge-dot" />}
      {children}
    </span>
  )
);

GlassBadge.displayName = 'GlassBadge';
