import clsx from 'clsx';
import React, { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

export type PanelVariant = 'panel' | 'card' | 'pill';

export interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: PanelVariant;
  interactive?: boolean;
}

const VARIANT_CLASS: Record<PanelVariant, string> = {
  panel: 'lg-panel--panel',
  card: 'lg-panel--card',
  pill: 'lg-panel--pill',
};

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, variant = 'card', interactive = false, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        data-lg-interactive={interactive ? 'true' : undefined}
        className={clsx('lg-glass-surface', VARIANT_CLASS[variant], className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';
