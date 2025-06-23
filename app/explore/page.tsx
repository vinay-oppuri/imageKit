'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { IVideo } from '@/models/videoModel'
import Link from 'next/link'

const Explore = () => {
  const [videos, setVideos] = useState<IVideo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get('/api/videos')
      .then(res => setVideos(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-center py-10">Loading popular videos...</p>

  return (
    <section className="px-4 md:px-20 py-12">
      <h2 className="text-2xl font-bold mb-4">Popular Videos</h2>
      <p className="mb-6 text-muted-foreground">Browse trending videos shared by our community</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map(video => (
          <Link
            href={`/videos/${video._id}`}
            key={video._id.toString()}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition bg-card"
          >
            <div className="w-full h-40 md:h-48 bg-muted flex items-center justify-center">
              <video
                src={video.videoUrl}
                className="w-full h-full object-cover"
                preload="metadata"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg line-clamp-1">{video.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">by 'Someone'</p>
              <span className="text-primary font-bold">★</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Explore