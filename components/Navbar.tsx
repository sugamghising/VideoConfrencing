import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MobileNav from './MobileNav'
import { SignedIn } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center fixed z-50 w-full bg-slate-300 px-6 py-4 lg:px-10'>
      <Link href='/' className='flex items-center gap-1'>
        <Image
          src='/icons/logo.svg'
          alt="Logo of the application"
          width={32}
          height={32}
          className='max-sm:size-10'
        />
       <p className='text-[26px] font-extrabold text-gray-950 max-sm:hidden'>
        VOOOM
       </p>
      </Link>


      <div className=" flex justify-between items-center gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>     
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar