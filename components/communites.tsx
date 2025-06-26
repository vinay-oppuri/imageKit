'use client'

import * as React from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "./ui/button"
import toast from "react-hot-toast"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { User } from "lucide-react"

interface Community {
  name: string
  description?: string
  admin: {
    username: string
    email: string
    image: string
  }
}

export function Communities() {
  const [communities, setCommunities] = useState<Community[]>([])

  const handleClick = async (name: string) => {
    try {
      const res = await axios.post('/api/community/join', { name });
      if (res.data.message) {
        toast.success(res.data.message)
      } else if (res.data.error) {
        toast.error(res.data.error)
      }
    } catch (error) {
      console.error("Join failed", error);
    }
  }

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await axios.get('/api/community/fetch')
        setCommunities(res.data)
      } catch (error) {
        console.error("Failed to load communities", error)
      }
    }

    fetchCommunities()
  }, [])

  return (
    <div className="flex items-center justify-center">
      <Carousel className="w-[60%] max-w-4xl">
        <CarouselContent className="-ml-1">
          {communities.map((community, index) => (
            <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
              <div className="p-2">
                <Card className="h-full">
                  <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                    <Avatar className="w-20 h-20">
                      {community.admin.image ? (
                        <AvatarImage src={community.admin.image} alt="User Avatar" />
                      ) : (
                        <AvatarFallback><User size={30} /></AvatarFallback>
                      )}
                    </Avatar>

                    <div className="flex flex-col text-center gap-3">
                      <h3 className="text-lg font-semibold">{community.name}</h3>
                      <p className="text-sm text-muted-foreground">{community.description || "No description"}</p>
                      <p className="text-xs text-muted-foreground">Created by: {community.admin.username}</p>
                      <p className="text-xs text-muted-foreground">Email: {community.admin.email}</p>
                    </div>
                      <Button className="w-full" onClick={() => handleClick(community.name)}>Join</Button>

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