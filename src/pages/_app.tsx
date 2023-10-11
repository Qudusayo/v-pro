import "@/lib/parse";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { StoreProvider } from "@/store/store";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <main className={`${inter.className}`}>
        <Toaster />
        <Component {...pageProps} />
      </main>
    </StoreProvider>
  );
}
