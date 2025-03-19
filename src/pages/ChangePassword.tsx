
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm, FormField } from '@/components/AuthForm';
import MainLayout from '@/layouts/MainLayout';
import { changePassword } from '@/lib/auth';

const ChangePassword = () => {
  const navigate = useNavigate();
  
  const fields: FormField[] = [
    {
      id: 'currentPassword',
      label: 'Current Password',
      type: 'password',
      placeholder: 'Enter current password',
      validation: {
        required: true,
      },
    },
    {
      id: 'newPassword',
      label: 'New Password',
      type: 'password',
      placeholder: 'Enter new password',
      validation: {
        required: true,
        minLength: 6,
      },
    },
    {
      id: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm new password',
      validation: {
        required: true,
        match: 'newPassword',
      },
    },
  ];
  
  const handleSubmit = async (data: Record<string, string>) => {
    await changePassword(data.currentPassword, data.newPassword);
    navigate('/dashboard');
  };
  
  return (
    <MainLayout>
      <div className="py-16 px-6">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-medium mb-2">Change Password</h1>
            <p className="text-gray-600">Update your password to keep your account secure</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <AuthForm
              title=""
              subtitle=""
              fields={fields}
              submitText="Update Password"
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChangePassword;
