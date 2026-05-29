'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions';
import PlaidLink from './PlaidLink';

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ''
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (type === 'sign-up') {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password
        };
        const newUser = await signUp(userData);
        setUser(newUser);
      }
      if (type === 'sign-in') {
        const response = await signIn({ email: data.email, password: data.password });
        if (response) router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-6 md:gap-8">
        {/* Logo */}
        <Link href="/" className="cursor-pointer flex items-center gap-3 group w-fit">
          <div className="relative size-10 rounded-xl bg-bank-gradient flex items-center justify-center shadow-glow-blue group-hover:shadow-glow-purple transition-all duration-500">
            <div className="absolute inset-0 rounded-xl bg-bank-gradient opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
            <Image
              src="/icons/logo.svg"
              width={24}
              height={24}
              alt="Horizon logo"
              className="relative z-10 brightness-[10]"
            />
          </div>
          <h1 className="text-26 font-ibm-plex-serif font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Horizon
          </h1>
        </Link>

        {/* Heading */}
        <div className="flex flex-col gap-2">
          <h1 className="text-30 lg:text-36 font-bold text-white leading-tight">
            {user
              ? 'Connect Your Bank'
              : type === 'sign-in'
                ? 'Welcome back'
                : 'Create account'
            }
          </h1>
          <p className="text-16 font-normal text-gray-500">
            {user
              ? 'Link your bank account securely to get started'
              : type === 'sign-in'
                ? 'Sign in to your Horizon dashboard'
                : 'Join thousands managing their finances smarter'
            }
          </p>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {type === 'sign-up' && (
                <>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name="firstName" label="First Name" placeholder="John" />
                    <CustomInput control={form.control} name="lastName" label="Last Name" placeholder="Doe" />
                  </div>
                  <CustomInput control={form.control} name="address1" label="Address" placeholder="123 Main Street" />
                  <CustomInput control={form.control} name="city" label="City" placeholder="New York" />
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name="state" label="State" placeholder="NY" />
                    <CustomInput control={form.control} name="postalCode" label="Postal Code" placeholder="10001" />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name="dateOfBirth" label="Date of Birth" placeholder="YYYY-MM-DD" />
                    <CustomInput control={form.control} name="ssn" label="SSN" placeholder="1234" />
                  </div>
                </>
              )}

              <CustomInput control={form.control} name="email" label="Email" placeholder="you@example.com" />
              <CustomInput control={form.control} name="password" label="Password" placeholder="••••••••" />

              <div className="flex flex-col gap-4 pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="form-btn h-12 rounded-xl text-16 font-semibold tracking-wide transition-all duration-300 hover:opacity-90 hover:shadow-glow-blue active:scale-[0.98]"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={20} className="animate-spin" />
                      <span>Please wait...</span>
                    </span>
                  ) : type === 'sign-in' ? '→  Sign In' : '→  Create Account'}
                </Button>
              </div>
            </form>
          </Form>

          {/* Trust badges */}
          {type === 'sign-in' && (
            <div className="flex items-center justify-center gap-6 py-2">
              {['256-bit SSL', 'Bank-grade Security', 'FDIC Insured'].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 text-11 text-gray-600">
                  <div className="size-1.5 rounded-full bg-green-500" />
                  {badge}
                </div>
              ))}
            </div>
          )}

          <footer className="flex justify-center gap-1.5">
            <p className="text-14 font-normal text-gray-500">
              {type === 'sign-in' ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Link
              href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
              className="text-14 font-semibold text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-4"
            >
              {type === 'sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;