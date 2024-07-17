import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            <div className="flex flex-col items-center bg-white p-10 rounded-lg shadow-lg max-w-md">
                <svg className="w-48 h-48 mb-4" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m2 0a2 2 0 100-4H7a2 2 0 100 4h8m-2 0v4m4-4V9m0 0V5.5A2.5 2.5 0 0016.5 3h-9A2.5 2.5 0 005 5.5V9m0 0v4m-1 4h16m-4-4H7m0 0v4m-2 0h16" />
                </svg>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-lg text-gray-600 mb-6 text-center">Oops! The page you're looking for doesn't exist.</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 transition duration-150 ease-in-out"
                >
                    Go Back Home
                </button>
            </div>
        </div>
    );
};

export default PageNotFound;
