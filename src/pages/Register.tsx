
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthForm, FormField } from '@/components/AuthForm';
import AuthLayout from '@/layouts/AuthLayout';
import { register } from '@/lib/auth';

const Register = () => {
  const navigate = useNavigate();
  
  const fields: FormField[] = [
    {
      id: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Enter your name',
      validation: {
        required: true,
        minLength: 2,
      },
    },
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
      placeholder: 'Create a password',
      validation: {
        required: true,
        minLength: 6,
      },
    },
    {
      id: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm your password',
      validation: {
        required: true,
        match: 'password',
      },
    },
  ];
  
  const handleSubmit = async (data: Record<string, string>) => {
    await register(data.email, data.password, data.name);
    navigate('/dashboard');
  };
  
  return (
    <AuthLayout>
      <AuthForm
        title="Create an Account"
        subtitle="Sign up and get started with your secure account"
        fields={fields}
        submitText="Create Account"
        onSubmit={handleSubmit}
        additionalContent={
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        }
      />
    </AuthLayout>
  );
};

export default Register;
