'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import JoinButton from '@/components/JoinButton'
import toast from 'react-hot-toast'

interface Community {
  _id: string
  name: string
  description?: string
  admin: {
    name: string
  }
  members: {
    _id: string
    name: string
  }[]
}

export default function CommunityPage() {
    
  const { id } = useParams() as { id: string }
  const [community, setCommunity] = useState<Community | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const res = await fetch(`/api/community/${id}`)
        const data = await res.json()

        if (!res.ok) {
          toast.error(data.error)
          setCommunity(null)
          setLoading(false)
          return
        }

        setCommunity(data)
      } catch (err) {
        toast.error('Something went Wrong')
        setCommunity(null)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchCommunity()
  }, [id])

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>
  }

  if (!community) {
    return <p className="text-center mt-20">Community not found or an error occurred.</p>
  }

  return (
    <main className="max-w-4xl mx-auto py-10 px-4 space-y-6 mt-24 md:mt-28">
      <section>
        <h1 className="text-4xl font-bold">{community.name}</h1>
        <p className="text-muted-foreground mt-2">
          {community.description || 'No description provided.'}
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 border p-4 rounded-xl shadow-sm bg-muted/10">
        <div>
          <h3 className="font-semibold text-sm text-muted-foreground">Admin</h3>
          <p className="text-base">{community.admin.name}</p>
        </div>

        <div>
          <h3 className="font-semibold text-sm text-muted-foreground">Members</h3>
          <p className="text-base">{community.members.length}</p>
        </div>
      </section>

      <JoinButton name={community.name} />

      <section className="pt-6">
        <h2 className="text-xl font-semibold mb-2">Members</h2>
        <ul className="list-disc list-inside space-y-1">
          {community.members.map((member) => (
            <li key={member._id}>{member.name}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}