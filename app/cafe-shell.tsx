"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Coffee, Flower2, Heart, Menu, X } from "lucide-react";
import { phone } from "./cafe-data";
const links = [["/", "Home"], ["/menu", "The menu"], ["/our-place", "Our place"], ["/catering", "Catering"], ["/visit", "Visit us"]];
export function CafeHeader() {
  const path = usePathname().replace(/\/$/, "") || "/";
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {if (!open) return;const close = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };document.addEventListener("keydown", close);return () => document.removeEventListener("keydown", close);}, [open]);
  return <><a className="skip-link" href="#main">Skip to content</a><div className="top-note"><Flower2 size={15} aria-hidden="true"/><span>A little corner of downtown Denver, since 1997.</span><Flower2 size={15} aria-hidden="true"/></div>
    <header className="site-header"><a href="/" className="wordmark" aria-label="Cafe 21 Express home">café<span>21</span><small>EXPRESS</small></a><nav className="desktop-nav" aria-label="Main navigation">{links.map(([href,label])=><a key={href} href={href} aria-current={path===href?"page":undefined}>{label}</a>)}</nav><a className="button header-button" href="/menu"><Coffee size={17}/>Something good</a><button className="nav-toggle" aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>{open&&<nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{links.map(([href,label])=><a key={href} href={href} aria-current={path===href?"page":undefined} onClick={()=>setOpen(false)}>{label}<ArrowUpRight size={18}/></a>)}</nav>}</header></>;
}
export function CafeFooter() {return <footer className="site-footer"><div className="gingham-strip" aria-hidden="true"/><div className="footer-inner container"><div className="footer-welcome"><Flower2 size={40} strokeWidth={1.25} aria-hidden="true"/><h2>See you at <em>café21.</em></h2><p>A little coffee. A lovely lunch. A moment for you.</p></div><div className="footer-links"><nav aria-label="Footer navigation">{links.map(([href,label])=><a key={href} href={href}>{label}</a>)}</nav><div><p>999 18th St, Suite 101<br/>Denver, CO 80202</p><a href={phone}>303-297-3651</a></div><div><p>Breakfast · 7:30–11 AM<br/>Lunch · 11 AM–2:30 PM</p><a href="https://www.facebook.com/people/Cafe-21-Express/61560865275557/" target="_blank" rel="noreferrer">Find us on Facebook <ArrowUpRight size={14}/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Café 21 Express</span><span>With love, from downtown. <Heart size={13} aria-hidden="true"/></span></div></div></footer>;}
