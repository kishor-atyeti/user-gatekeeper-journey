
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '@/components/ui-components';
import MainLayout from '@/layouts/MainLayout';
import { getCurrentUser, isAuthenticated, User } from '@/lib/auth';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    setUser(getCurrentUser());
  }, [navigate]);
  
  if (!user) {
    return (
      <MainLayout>
        <div className="py-20 px-6 text-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <div className="inline-block px-3 py-1 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-2">
              Dashboard
            </div>
            <h1 className="text-3xl font-medium mb-2">Welcome, {user.name}</h1>
            <p className="text-gray-600">Manage your account and settings</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-md transition-shadow animate-fade-in" style={{ animationDelay: '100ms' }}>
              <h2 className="text-xl font-medium mb-2">Profile</h2>
              <p className="text-gray-600 mb-4">Manage your personal information</p>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Name</div>
                  <div className="font-medium">{user.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium">{user.email}</div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 hover:shadow-md transition-shadow animate-fade-in" style={{ animationDelay: '200ms' }}>
              <h2 className="text-xl font-medium mb-2">Account Security</h2>
              <p className="text-gray-600 mb-4">Manage your password and security settings</p>
              <Button 
                onClick={() => navigate('/change-password')} 
                variant="outline" 
                className="w-full"
              >
                Change Password
              </Button>
            </Card>
            
            <Card className="p-6 hover:shadow-md transition-shadow animate-fade-in" style={{ animationDelay: '300ms' }}>
              <h2 className="text-xl font-medium mb-2">Preferences</h2>
              <p className="text-gray-600 mb-4">Customize your app experience</p>
              <div className="text-gray-500 italic">
                No preferences available
              </div>
            </Card>
          </div>
          
          <div className="mt-12 border-t border-gray-100 pt-8">
            <h2 className="text-2xl font-medium mb-6">Recent Activity</h2>
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <p className="text-gray-500">No recent activity to display</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
