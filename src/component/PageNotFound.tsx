import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800">
      <div className="text-center text-white px-6">
        <div className="mb-8">
          <h1 className="text-9xl font-bold mb-4 opacity-50">404</h1>
          <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
          <p className="text-xl mb-8 opacity-80">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            to="/" 
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Go Home
          </Link>
          
          <div className="mt-4">
            <Link 
              to="/templates" 
              className="inline-block text-white border border-white px-6 py-2 rounded-lg hover:bg-white hover:text-purple-600 transition-colors duration-300 mr-4"
            >
              Browse Templates
            </Link>
            
            <Link 
              to="/login" 
              className="inline-block text-white border border-white px-6 py-2 rounded-lg hover:bg-white hover:text-purple-600 transition-colors duration-300"
            >
              Login
            </Link>
          </div>
        </div>
        
        <div className="mt-12 opacity-60">
          <p className="text-sm">
            If you believe this is an error, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
