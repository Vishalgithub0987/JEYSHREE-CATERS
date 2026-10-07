'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Utensils, Home, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/data/site';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect back to home after 3 seconds
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#052020',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'rgba(228, 197, 144, 0.15)',
          border: '2px solid #C89F5C',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <Utensils size={36} color="#E4C590" />
      </div>

      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          color: '#E4C590',
          marginBottom: '0.75rem',
        }}
      >
        Page Not Found
      </h1>

      <p
        style={{
          fontSize: '1.1rem',
          color: 'rgba(255, 255, 255, 0.85)',
          maxWidth: '540px',
          lineHeight: '1.6',
          marginBottom: '2rem',
        }}
      >
        The page you are looking for has been moved or updated. Redirecting you automatically to the authentic JayShree Caters feast experience...
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/"
          className="theme-btn btn-style-one"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Home size={18} />
          <span>Return to Home</span>
        </Link>
        <Link
          href="/menu"
          className="theme-btn btn-style-two"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <span>Explore Menu</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <div style={{ marginTop: '3rem', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.5)' }}>
        {siteConfig.legalName} • K V Kuppam, Tamil Nadu
      </div>
    </div>
  );
}
