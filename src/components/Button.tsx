// src/components/Button.tsx
import React, {ButtonHTMLAttributes} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({
                                           variant = 'primary',
                                           children,
                                           className,
                                           ...props
                                       }) => {
    const baseClasses = 'py-2 px-4 rounded focus:outline-none';
    const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700',
        danger: 'bg-red-600 text-white hover:bg-red-700',
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${className || ''}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;