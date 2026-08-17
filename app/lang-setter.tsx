"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
export function LangSetter(){const pathname=usePathname();useEffect(()=>{document.documentElement.lang=pathname?.startsWith("/tr")?"tr":"en"},[pathname]);return null}
