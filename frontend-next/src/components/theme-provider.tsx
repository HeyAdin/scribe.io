"use client"
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner";
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>
    <Provider store={store}>
      {children}
    </Provider>
    <Toaster />
  </NextThemesProvider>
}
