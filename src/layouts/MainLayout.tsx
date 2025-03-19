
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo, Button } from '@/components/ui-components';
import { logout, isAuthenticated } from '@/lib/auth';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="py-4 px-6 border-b border-gray-100 bg-white sticky top-0 z-20 backdrop-blur-sm bg-white/80">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="transition-opacity hover:opacity-80">
            <Logo />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`nav-link ${isActive('/') ? 'text-primary font-medium' : ''}`}>
              Home
            </Link>
            {authenticated ? (
              <>
                <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'text-primary font-medium' : ''}`}>
                  Dashboard
                </Link>
                <Link to="/change-password" className={`nav-link ${isActive('/change-password') ? 'text-primary font-medium' : ''}`}>
                  Settings
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className={`nav-link ${isActive('/login') ? 'text-primary font-medium' : ''}`}>
                  Login
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 py-4 px-6 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className={`nav-link ${isActive('/') ? 'text-primary font-medium' : ''}`} onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              {authenticated ? (
                <>
                  <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'text-primary font-medium' : ''}`} onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <Link to="/change-password" className={`nav-link ${isActive('/change-password') ? 'text-primary font-medium' : ''}`} onClick={() => setIsMenuOpen(false)}>
                    Settings
                  </Link>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className={`nav-link ${isActive('/login') ? 'text-primary font-medium' : ''}`} onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button size="sm" className="w-full">Register</Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </header>
      
      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Logo />
              <p className="mt-2 text-sm text-gray-500">
                Secure authentication and user management
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">Terms</a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Secure. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
