// src/components/I18nProvider.tsx
'use client';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { Translation } from '@/i18n/request';

export default function I18nProvider({ 
  children, 
  locale, 
  messages 
}: { 
  children: ReactNode;
  locale: string;
  messages: Translation;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
