import clsx from 'clsx';
import React, { forwardRef } from 'react';

export type ButtonVariant = 'primary' | 'prominent' | 'ghost' | 'soft';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'lg-button--primary',
  prominent: 'lg-button--prominent',
  ghost: 'lg-button--ghost',
  soft: 'lg-button--soft',
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: 'lg-button--sm',
  md: 'lg-button--md',
  lg: 'lg-button--lg',
};

export const GlassButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      type = 'button',
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx('lg-button', VARIANT_CLASS[variant], SIZE_CLASS[size], className)}
        {...rest}
      >
        <span className="lg-button__layers" aria-hidden="true">
          <span className="lg-button__light" />
          <span className="lg-button__distortion" />
          <span className="lg-button__tint" />
          <span className="lg-button__shine" />
          <span className="lg-button__rim" />
        </span>
        <span className="lg-button__label">{children}</span>
      </button>
    );
  }
);

GlassButton.displayName = 'GlassButton';
