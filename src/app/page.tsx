import Link from 'next/link';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton
} from '@clerk/nextjs';
export default function Home() {
  return (
    <div className=''>
      <header className='flex h-16 items-center justify-between'>
        <Link href={'/'}>Remindly-newly</Link>
        <div className=''>
          <SignedOut>
            <SignInButton />
            <SignUpButton>
              <button className='h-10 cursor-pointer rounded-full bg-[#6c47ff] px-4 text-sm font-medium text-white sm:h-12 sm:px-5 sm:text-base'>
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
    </div>
  );
}
