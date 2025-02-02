import React from "react";
import Logo from "./Logo";
import { SiGithub, SiLinkedin } from "react-icons/si";
import Lang from "./Lang";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-16 bg-white shadow-md sticky top-0 z-50">
        <div className="container px-4 mx-auto flex items-center h-full justify-between">
          <Logo />
          <div className="flex gap-3 lg:gap-6 items-center">
            <a title="github account" href="https://github.com/mkhotami" className="hover:underline">
              <SiGithub size={20} />
            </a>
            <a title="linkedin account" href="https://www.linkedin.com/in/mkhotami-rais/">
              <SiLinkedin size={20} />
            </a>
            <Lang />
          </div>
        </div>
      </header>
      <main className="grow container py-4">{children}</main>
      <footer className="border-t border-gray-200 h-16 flex items-center justify-center bg-white">
        <div className="container flex items-center justify-center">
          <div>
            Built by{" "}
            <a href="https://mkhotami.vercel.app" className="text-blue-500 hover:underline ">
              Mkhotami
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
