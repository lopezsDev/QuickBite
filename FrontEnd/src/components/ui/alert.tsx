// components/ui/Alert.tsx
import React from 'react';

interface AlertProps {
    type: 'success' | 'error';
    message: string;
    onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
    return (
        <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
                type === 'success' ? 'bg-green-600' : 'bg-red-600'
            } text-white`}
            role="alert"
        >
            <div className="flex justify-between items-center">
                <span>{message}</span>
                <button onClick={onClose} className="ml-4 text-white font-bold">X</button>
            </div>
        </div>
    );
};

export default Alert;
