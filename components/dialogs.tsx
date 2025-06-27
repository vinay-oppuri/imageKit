'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import axios from 'axios'
import toast from 'react-hot-toast'
import { NextResponse } from 'next/server'
import Link from 'next/link'

export const CommunityCreate = () => {

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState({
        name: '',
        description: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const req = await axios.post('/api/community/create', form)
            setLoading(true)
            if (req.data.message) {
                toast.success(req.data.message)
                setForm({ name: '', description: '' })
                setOpen(false)
                setLoading(false)
            } else {
                toast.error(req.data.error)
            }
            return NextResponse.json({ error: 'Failed!' })

        } catch (error: any) {
            NextResponse.json({ error: 'Something went wrong' })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button variant='outline' className='text-primary hover:text-primary dark:bg-muted dark:hover:bg-popover'>Create Community</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] backdrop-blur-md bg-white/10 dark:bg-zinc-800/30 border border-white/20 shadow-xl">
                    <DialogHeader>
                        <DialogTitle>Create a New Community</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="font-semibold">Name</label>
                            <Input
                                name="name"
                                value={form.name}
                                placeholder="Community Name"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="font-semibold">Description</label>
                            <Textarea
                                name="description"
                                value={form.description}
                                placeholder="What is this community about?"
                                onChange={handleChange}
                                className="border rounded-lg"
                            />
                        </div>

                        <Button type="submit" disabled={loading}>
                            {loading ? 'Creating...' : 'Create'}
                        </Button>

                        <div className="flex justify-between text-sm text-muted-foreground pt-2">
                            <span>Want to join a community?</span>
                            <Link
                                href="/community"
                                onClick={() => setOpen(false)}
                                className="text-primary font-medium"
                            >
                                Explore
                            </Link>
                        </div>
                    </form>
                </DialogContent>

            </form>
        </Dialog>
    )
}