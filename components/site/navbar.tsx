"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "功能", href: "#features" },
  { label: "GitHub", href: "https://github.com/we-used-to-be/Guanmo-open", external: true },
  { label: "下载", href: "https://github.com/we-used-to-be/Guanmo-open/releases/latest", external: true },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
      <div className="nav-inner">
        <a className="brand" href="#top" aria-label="观墨 Guanmo 首页">
          <Image src="/assets/guanmo-icon.png" alt="" width={34} height={34} priority />
          <span>观墨</span>
          <small>Guanmo</small>
        </a>

        <nav className="desktop-nav" aria-label="主导航">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "关闭菜单" : "打开菜单"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={19} strokeWidth={1.7} /> : <Menu size={19} strokeWidth={1.7} />}
        </button>
      </div>

      <div className={`mobile-nav ${open ? "mobile-nav--open" : ""}`}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noreferrer" : undefined}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}
