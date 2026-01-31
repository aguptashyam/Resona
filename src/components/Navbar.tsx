"use client"
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from './ui/button'

const Navbar = () => {
    const {data: session} = useSession()
    const user: User = session?.user as User
    
    return (
        <nav className='p-4 md:p-4 shadow-md bg-gray-900 text-white'>
            <div className='container mx-auto flex flex-col sm:flex-row justify-between items-center'>
                <a href="/" className='text-2xl font-bold font-serif md:mb-0'>Resona</a>
                {
                    session ? (
                        <>
                        <span className='mr-4 font-bold font-mono text-2xl'>Welcome, {user?.username || user?.email}</span>
                        <Button className='w-auto bg-slate-100 text-black' variant='outline' 
                        onClick={() => signOut({callbackUrl: '/'})}>
                            Logout
                        </Button>
                        </>
                    ) : (
                        <Link href='/signin'>
                            <Button className='w-auto font-sans bg-slate-100 text-black' variant='outline'>Login</Button>
                        </Link>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar