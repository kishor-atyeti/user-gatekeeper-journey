
import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthForm, FormField } from '@/components/AuthForm';
import AuthLayout from '@/layouts/AuthLayout';
import { resetPassword } from '@/lib/auth';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || 'demo-token';
  
  const fields: FormField[] = [
    {
      id: 'password',
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
        match: 'password',
      },
    },
  ];
  
  const handleSubmit = async (data: Record<string, string>) => {
    await resetPassword(token, data.password);
    navigate('/login');
  };
  
  return (
    <AuthLayout>
      <AuthForm
        title="Reset Password"
        subtitle="Create a new password for your account"
        fields={fields}
        submitText="Reset Password"
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

export default ResetPassword;
