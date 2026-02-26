import type { AppProps } from 'next/app';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import '@/index.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Component {...pageProps} />
    </TooltipProvider>
  );
}
