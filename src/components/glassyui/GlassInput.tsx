import clsx from 'clsx';
import React, { forwardRef, useId } from 'react';

export interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, id, label, hint, type = 'text', ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? `lg-input-${generatedId}`;

    return (
      <div className="glass-input-wrapper">
        {label && (
          <label htmlFor={inputId} className="glass-input-label">
            {label}
          </label>
        )}
        <input
          {...props}
          id={inputId}
          ref={ref}
          type={type}
          data-lg-refraction="none"
          className={clsx('lg-input', className)}
        />
        {hint && <span className="glass-input-hint">{hint}</span>}
      </div>
    );
  }
);

GlassInput.displayName = 'GlassInput';
