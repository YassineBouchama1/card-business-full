'use client'
import type { FC } from 'react';
import { AlignJustify, Bell, Search } from 'lucide-react';
import { logout } from '@/actions/profile';
import { SubmitButton } from './SubmitButton';


interface HeaderProps { }

const Header: FC<HeaderProps> = ({ }) => {


  return (
    <header className="bg-white py-6 shadow-lg border-gray-200 px-4 h-36 lg:px-6  dark:bg-gray-800 ">
      <nav className="flex  items-center justify-between ">
        Header
        <form action={logout}>
          <SubmitButton title="Logout"></SubmitButton>
        </form>
      </nav>
    </header>
  );
}
export default Header;