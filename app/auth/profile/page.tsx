import React, { Suspense } from 'react'
import ProfileClient from './ProfileClient'

export default function ProfilePage() {
  
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <ProfileClient />
    </Suspense>
  )
}