'use client'

import { Button } from '@/components/ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function JoinButton({ name }: { name: string }) {
  const handleClick = async () => {
    try {
      const res = await axios.post('/api/community/join', { name })

      if (res.data.message) {
        toast.success(res.data.message)
      } else if (res.data.error) {
        toast.error(res.data.error)
      } else {
        toast.error('Unexpected server response.')
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Join failed.')
    }
  }

  return <Button onClick={handleClick}>Join Community</Button>
}