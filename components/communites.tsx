'use client'

import * as React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import toast from 'react-hot-toast'
import ComCard from './ui/comCard'

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
      <Carousel className="w-[60%] md:w-full md:max-w-6xl md:px-4" opts={{ align: 'start', slidesToScroll: 1 }}>
        <CarouselContent>
          {communities.map((community, index) => (
            <CarouselItem
              key={index}
              className=" sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <ComCard
                title={community.name}
                description={community.description || "No description"}
                profile={community.admin.image}
                createdBy={community.admin.name}
                email={community.admin.email}
                buttonText="Join"
                onButtonClick={() => handleClick(community.name)}
                loading={joining === community.name}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}