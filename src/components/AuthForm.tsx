
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from './ui-components';

export type FormField = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  validation?: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
    match?: string;
  };
};

type AuthFormProps = {
  title: string;
  subtitle: string;
  fields: FormField[];
  submitText: string;
  onSubmit: (data: Record<string, string>) => Promise<void>;
  additionalContent?: React.ReactNode;
};

export const AuthForm: React.FC<AuthFormProps> = ({
  title,
  subtitle,
  fields,
  submitText,
  onSubmit,
  additionalContent,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    fields.forEach((field) => {
      const value = formData[field.id] || '';
      
      if (field.validation?.required && !value) {
        newErrors[field.id] = `${field.label} is required`;
      } else if (field.validation?.minLength && value.length < field.validation.minLength) {
        newErrors[field.id] = `${field.label} must be at least ${field.validation.minLength} characters`;
      } else if (field.validation?.pattern && !field.validation.pattern.test(value)) {
        newErrors[field.id] = `Please enter a valid ${field.label.toLowerCase()}`;
      } else if (field.validation?.match && value !== formData[field.validation.match]) {
        newErrors[field.id] = `${field.label} does not match`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Handle server validation errors if they exist
      if (error instanceof Error) {
        setErrors((prev) => ({ ...prev, form: error.message }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card animate-fade-in">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-medium mb-1">{title}</h1>
          <p className="text-gray-500">{subtitle}</p>
        </div>
        
        {errors.form && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4 animate-fade-in">
            {errors.form}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <Input
              key={field.id}
              id={field.id}
              name={field.id}
              type={field.type}
              label={field.label}
              placeholder={field.placeholder}
              value={formData[field.id] || ''}
              onChange={handleChange}
              error={errors[field.id]}
              required={field.validation?.required}
              className="animate-fade-in"
              style={{ animationDelay: `${fields.indexOf(field) * 50}ms` }}
            />
          ))}
          
          <Button 
            type="submit" 
            className="auth-button mt-6" 
            isLoading={isSubmitting}
          >
            {submitText}
          </Button>
        </form>
        
        {additionalContent && (
          <div className="pt-4 text-center text-sm text-gray-500">
            {additionalContent}
          </div>
        )}
      </div>
    </div>
  );
};
