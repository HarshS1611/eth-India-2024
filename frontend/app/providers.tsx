'use client';
 
import type { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'wagmi/chains'; // add baseSepolia for testing
 
export function Providers(props: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey="gDSdYE96v4KoRgypfLPf2Okh4YOY4Jh3"
      chain={base}
    >
      {props.children}
    </OnchainKitProvider>
  );
}