// app/community/[id]/page.tsx
import { notFound } from 'next/navigation'
import connectDB from '@/lib/dbConfig'
import { Community, ICommunity } from '@/models/communityModel'
import mongoose from 'mongoose'
import JoinButton from '@/components/JoinButton' // client component


export default async function CommunityPage({
    params,
}: {
    params: { id: string }
}) {
    const { id } = params

    if (!mongoose.Types.ObjectId.isValid(id)) return notFound()

    await connectDB()

    const community = await Community.findById(id)
        .populate('admin', 'name email')
        .populate('members', 'name')
        .lean<ICommunity>()

    if (!community) return notFound()

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
                    <p className="text-base">{(community.admin as any).name}</p>
                </div>

                <div>
                    <h3 className="font-semibold text-sm text-muted-foreground">Members</h3>
                    <p className="text-base">{community.members.length}</p>
                </div>
            </section>

            <JoinButton name={community.name} /> {/* 🔁 Client component */}

            <section className="pt-6">
                <h2 className="text-xl font-semibold mb-2">Members</h2>
                <ul className="list-disc list-inside space-y-1">
                    {(community.members as any[]).map((member) => (
                        <li key={member._id}>{member?.name}</li>
                    ))}
                </ul>
            </section>
        </main>
    )
}