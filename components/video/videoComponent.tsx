import { IKVideo } from 'imagekitio-react'
import Link from "next/link"
import { IVideo } from "@/models/videoModel"

export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <div className="bg-white/10 dark:bg-zinc-800/20 backdrop-blur-md border border-white/20 dark:border-zinc-700/30 shadow-xl rounded-xl overflow-hidden transition-all hover:shadow-2xl duration-300">
      <figure className="relative">
        <Link href={`/videos/${video._id}`} className="relative group block">
          <div
            className="relative w-full"
            style={{ aspectRatio: "9/16" }}
          >
            <IKVideo
              path={video.videoUrl}
              transformation={[
                {
                  height: "1920",
                  width: "1080",
                },
              ]}
              controls={video.controls}
              className="w-full h-full object-cover rounded-t-xl"
            />
          </div>
        </Link>
      </figure>

      <div className="p-4">
        <Link
          href={`/videos/${video._id}`}
          className="hover:opacity-90 transition-opacity"
        >
          <h2 className="text-lg font-semibold">{video.title}</h2>
        </Link>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  )
}