'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { IVideo } from '@/models/videoModel'
import { Dialog } from '@headlessui/react'
import { X } from 'lucide-react'

const Explore = () => {
  const [videos, setVideos] = useState<IVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<IVideo | null>(null)

  useEffect(() => {
    axios
      .get('/api/videos')
      .then(res => setVideos(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-center py-10">Loading popular videos...</p>

  return (
    <section className="px-4 md:px-20 py-12 mb-10">
      <h2 className="text-2xl font-bold mb-4">Popular Videos</h2>
      <p className="mb-6 text-muted-foreground">Browse trending videos shared by our community</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map(video => (
          <div
            key={video._id.toString()}
            onClick={() => setSelectedVideo(video)}
            className="cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition bg-card"
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
              <p className="text-sm text-muted-foreground line-clamp-1">{''}</p>
              <span className="text-primary font-bold">★</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={!!selectedVideo} onClose={() => setSelectedVideo(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-lg overflow-hidden">
            <div className="flex justify-between items-center px-4 py-2 border-b border-muted">
              <h2 className="text-lg font-semibold">{selectedVideo?.title}</h2>
              <button onClick={() => setSelectedVideo(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <video
              src={selectedVideo?.videoUrl}
              controls
              autoPlay
              className="w-full max-h-[70vh] object-contain"
              poster={selectedVideo?.thumbnailUrl}
            />
            <div className="p-4 text-sm text-muted-foreground">{selectedVideo?.description}</div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </section>
  )
}

export default Explore