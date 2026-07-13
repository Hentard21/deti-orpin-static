import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variants = {
      primary:   'bg-crimson-600 text-white hover:bg-crimson-700 focus:ring-crimson-600 shadow-lg shadow-crimson-600/20',
      secondary: 'bg-navy-900 text-white hover:bg-navy-800 focus:ring-navy-900',
      outline:   'border-2 border-navy-900 text-navy-900 hover:bg-navy-50 focus:ring-navy-900 light:border-slate-900 light:text-slate-900',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };
    
    const full = fullWidth ? 'w-full' : '';
    
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], full, className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
