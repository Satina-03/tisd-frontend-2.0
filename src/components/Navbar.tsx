'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isDashboard = pathname?.includes('/dashboard');

  return (
    <Disclosure as="nav" className={`${isDashboard ? 'bg-blue-600' : 'bg-white'} shadow-sm`}>
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link href="/" className="flex-shrink-0 flex items-center">
                  <span className={`text-xl font-bold ${isDashboard ? 'text-white' : 'text-blue-600'}`}>TISD</span>
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <NavLink href="/projects" isDashboard={isDashboard}>Projects</NavLink>
                  <NavLink href="/sdgs" isDashboard={isDashboard}>SDGs</NavLink>
                  <NavLink href="/collaborations" isDashboard={isDashboard}>Collaborations</NavLink>
                  <NavLink href="/about" isDashboard={isDashboard}>About</NavLink>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Link
                  href={isDashboard ? "/auth/login" : "/auth/login"}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                    isDashboard 
                      ? 'text-blue-600 bg-white hover:bg-gray-50' 
                      : 'text-white bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isDashboard ? 'Sign Out' : 'Sign In'}
                </Link>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className={`inline-flex items-center justify-center p-2 rounded-md ${
                  isDashboard 
                    ? 'text-white hover:text-gray-200 hover:bg-blue-700'
                    : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'
                }`}>
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <MobileNavLink href="/projects" isDashboard={isDashboard}>Projects</MobileNavLink>
              <MobileNavLink href="/sdgs" isDashboard={isDashboard}>SDGs</MobileNavLink>
              <MobileNavLink href="/collaborations" isDashboard={isDashboard}>Collaborations</MobileNavLink>
              <MobileNavLink href="/about" isDashboard={isDashboard}>About</MobileNavLink>
            </div>
            <div className={`pt-4 pb-3 border-t ${isDashboard ? 'border-blue-700' : 'border-gray-200'}`}>
              <div className="mt-3 space-y-1">
                <MobileNavLink href="/auth/login" isDashboard={isDashboard}>
                  {isDashboard ? 'Sign Out' : 'Sign In'}
                </MobileNavLink>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

function NavLink({ href, children, isDashboard }: { href: string; children: React.ReactNode; isDashboard: boolean }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium ${
        isDashboard
          ? 'text-white hover:border-white hover:text-gray-100'
          : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children, isDashboard }: { href: string; children: React.ReactNode; isDashboard: boolean }) {
  return (
    <Link
      href={href}
      className={`block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium ${
        isDashboard
          ? 'text-white hover:text-gray-200 hover:bg-blue-700 hover:border-white'
          : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300'
      }`}
    >
      {children}
    </Link>
  );
} 