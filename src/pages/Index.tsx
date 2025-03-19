
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from '@/components/ui-components';
import { isAuthenticated } from '@/lib/auth';
import MainLayout from '@/layouts/MainLayout';
import { useScrollAnimation } from '@/lib/animations';

const Index = () => {
  const [heroRef, heroVisible] = useScrollAnimation(0.1);
  const [featuresRef, featuresVisible] = useScrollAnimation(0.1);
  const [ctaRef, ctaVisible] = useScrollAnimation(0.1);
  
  const authenticated = isAuthenticated();
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-gray-50 to-white"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-blue-100/30 blur-3xl"></div>
          <div className="absolute bottom-[10%] left-[5%] w-[250px] h-[250px] rounded-full bg-blue-100/30 blur-3xl"></div>
        </div>
        
        <div 
          ref={heroRef as React.RefCallback<HTMLDivElement>}
          className={`max-w-5xl mx-auto relative z-10 text-center transition-all duration-1000 transform ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block mb-4 px-3 py-1 bg-blue-100 rounded-full text-blue-700 text-sm font-medium">
            Secure Authentication
          </div>
          <h1 className="text-4xl md:text-6xl font-medium leading-tight mb-6">
            Authentication made <span className="text-primary">simple</span> and <span className="text-primary">beautiful</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            A modern, secure authentication system with an elegant design inspired by the best design principles.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {authenticated ? (
              <Link to="/dashboard">
                <Button size="lg">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button size="lg">Get Started</Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">Sign In</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div 
          ref={featuresRef as React.RefCallback<HTMLDivElement>}
          className={`max-w-7xl mx-auto transition-all duration-1000 ${
            featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium mb-4">Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for secure user management
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'User Registration',
                description: 'Simple and secure user registration with email verification',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                ),
              },
              {
                title: 'Authentication',
                description: 'Secure login with session management and token refresh',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
              },
              {
                title: 'Password Management',
                description: 'Change password and recovery options for better security',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div 
          ref={ctaRef as React.RefCallback<HTMLDivElement>}
          className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl font-medium mb-4">Ready to get started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create your account now and experience our elegant authentication system.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {authenticated ? (
              <Link to="/dashboard">
                <Button size="lg">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button size="lg">Create an Account</Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">Sign In</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
