
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthForm, FormField } from '@/components/AuthForm';
import AuthLayout from '@/layouts/AuthLayout';
import { requestPasswordReset } from '@/lib/auth';

const ForgotPassword = () => {
  const navigate = useNavigate();
  
  const fields: FormField[] = [
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      validation: {
        required: true,
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      },
    },
  ];
  
  const handleSubmit = async (data: Record<string, string>) => {
    await requestPasswordReset(data.email);
    navigate('/reset-password');
  };
  
  return (
    <AuthLayout>
      <AuthForm
        title="Forgot Password"
        subtitle="Enter your email to receive a password reset link"
        fields={fields}
        submitText="Send Reset Link"
        onSubmit={handleSubmit}
        additionalContent={
          <p>
            Remember your password?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        }
      />
    </AuthLayout>
  );
};

export default ForgotPassword;
