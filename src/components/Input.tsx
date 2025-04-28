// src/components/Input.tsx
import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({
                                         label,
                                         error,
                                         className,
                                         ...props
                                     }) => {
    return (
        <div className="mb-4">
            {label && (
                <label className="block text-gray-300 mb-2">
                    {label}
                </label>
            )}
            <input
                className={`w-full p-2 border rounded bg-gray-800 text-white border-gray-600 focus:border-blue-500 focus:outline-none ${className || ''} ${error ? 'border-red-500' : ''}`}
                {...props}
            />
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    );
};

export default Input;