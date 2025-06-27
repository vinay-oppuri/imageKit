'use client'

import * as React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Button } from './ui/button'
import toast from 'react-hot-toast'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { User } from 'lucide-react'
import Link from 'next/link'

interface Community {
  name: string
  description?: string
  admin: {
    name: string
    email: string
    image: string
  }
}

export function Communities() {
  const [communities, setCommunities] = useState<Community[]>([])
  const [joining, setJoining] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const handleClick = async (name: string) => {
    setJoining(name)
    try {
      const res = await axios.post('/api/community/join', { name })
      if (res.data.message) {
        toast.success(res.data.message)
      } else if (res.data.error) {
        toast.error(res.data.error)
      } else {
        toast.error("Unexpected server response.")
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Join failed.")
    } finally {
      setJoining(null)
    }
  }

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await axios.get('/api/community/fetch')
        setCommunities(res.data)
      } catch (error) {
        console.error("Failed to load communities", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCommunities()
  }, [])

  if (loading) {
    return <p className="text-center py-10">Loading communities...</p>
  }

  if (communities.length === 0) {
    return <p className="text-center py-10 text-muted-foreground">No communities found.</p>
  }

  return (
    <div className="flex items-center justify-center">
      <Carousel className="w-full max-w-4xl px-4">
        <CarouselContent className="-ml-1">
          {communities.map((community, index) => (
            <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
              <div className="p-2">
                <Card className="h-full">
                  <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                    <Avatar className="w-20 h-20">
                      {community.admin.image ? (
                        <AvatarImage
                          src={community.admin.image}
                          alt={`${community.admin.name}'s avatar`}
                        />
                      ) : (
                        <AvatarFallback><User size={30} /></AvatarFallback>
                      )}
                    </Avatar>

                    <div className="flex flex-col text-center gap-3">
                      <h3 className="text-lg font-semibold hover:underline cursor-pointer">
                        <Link href={`/community/${community.name}`}>
                          {community.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {community.description || "No description"}
                      </p>
                      <p className="text-xs text-muted-foreground">Created by: {community.admin.name}</p>
                      <p className="text-xs text-muted-foreground">Email: {community.admin.email}</p>
                    </div>

                    <Button
                      className="w-full"
                      disabled={joining === community.name}
                      onClick={() => handleClick(community.name)}
                    >
                      {joining === community.name ? "Joining..." : "Join"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}