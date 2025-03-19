
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthForm, FormField } from '@/components/AuthForm';
import AuthLayout from '@/layouts/AuthLayout';
import { login } from '@/lib/auth';

const Login = () => {
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
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      validation: {
        required: true,
      },
    },
  ];
  
  const handleSubmit = async (data: Record<string, string>) => {
    await login(data.email, data.password);
    navigate('/dashboard');
  };
  
  return (
    <AuthLayout>
      <AuthForm
        title="Welcome Back"
        subtitle="Sign in to your account"
        fields={fields}
        submitText="Sign In"
        onSubmit={handleSubmit}
        additionalContent={
          <div className="space-y-2">
            <p>
              <Link to="/forgot-password" className="text-primary hover:underline">
                Forgot your password?
              </Link>
            </p>
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Create one
              </Link>
            </p>
          </div>
        }
      />
    </AuthLayout>
  );
};

export default Login;
