import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Community = () => {
    return (
        <section className="flex flex-col md:flex-row justify-between items-center px-4 md:px-20 py-12 bg-accent rounded-xl mx-4 md:mx-20 mt-25">
            <div className="mb-6 md:mb-0 w-full md:w-1/3 h-48 md:h-60 bg-primary/20 rounded-xl flex items-center justify-center">
                <span className="text-primary font-semibold text-lg">🌟 Creator Highlight</span>
            </div>
            <div className="text-center md:text-left max-w-md md:mx-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">UNLEASH YOUR CREATIVITY</h2>
                <p className="text-muted-foreground mb-4">
                    Make your voice heard, share your stories, and connect with the world through video.
                </p>
                <p className="text-primary font-bold">🎉 Get featured this week!</p>
            </div>
            <Button className="mt-4 md:mt-0 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90">
                <Link href="/upload">Upload Now</Link>
            </Button>
        </section>
    )
}

export default Community