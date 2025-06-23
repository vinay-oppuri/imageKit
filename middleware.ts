import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default withAuth(
    function middleware(req: NextRequest) {
        const { pathname } = req.nextUrl
        const token = (req as any).nextauth?.token


        const authPages = ['/auth/login', '/auth/signup', '/auth/reset']
        const protectedPages = ['/auth/profile', '/upload', '/community']

        if (token && authPages.includes(pathname)) {
            return NextResponse.redirect(new URL('/auth/profile', req.url))
        }
        if (!token && protectedPages.includes(pathname)) {
            return NextResponse.redirect(new URL('/auth/login', req.url))
        }

        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: () => true
        },
        pages: {
            signIn: '/login'
        }
    }
)


export const config = {
    matcher: [
        '/',    
        '/auth/login',
        '/auth/signup',
        '/auth/reset',
        '/auth/profile',
        '/explore',
        '/upload',
        '/community',
        '/contact',
        '/api/:path*',
    ],
}
