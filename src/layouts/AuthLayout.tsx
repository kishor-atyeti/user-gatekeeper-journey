
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui-components';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-gray-50 to-white bg-fixed"></div>
      
      {/* Top blurred circle */}
      <div className="absolute top-[-150px] right-[-150px] w-[500px] h-[500px] rounded-full bg-blue-100/30 blur-3xl"></div>
      
      {/* Bottom blurred circle */}
      <div className="absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full bg-blue-100/30 blur-3xl"></div>
      
      {/* Header */}
      <header className="relative z-10 py-6 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="transition-opacity hover:opacity-80">
            <Logo />
          </Link>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-6 px-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Secure. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
