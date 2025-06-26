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

export const CommunityCreate = () => {
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
            if (req.data.message) {
                toast.success(req.data.message)
                setForm({ name: '', description: ''})
            } else  {
                toast.error(req.data.error)
            } 
            return NextResponse.json({error: 'Failed!'})
            
        } catch (error: any) {
            NextResponse.json({ error: 'Something went wrong' })
        }
    }

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant='outline' className='text-primary hover:text-primary'>Create Community</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Community</DialogTitle>
                    </DialogHeader>
                    <div className='flex flex-col gap-3'>
                        <div className="flex flex-col gap-2">
                            <p className='font-semibold'>Name</p>
                            <Input name='name' value={form.name} placeholder='Community Name' onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className='font-semibold'>Description</p>
                            <Textarea
                                name='description'
                                value={form.description}
                                placeholder='Description'
                                onChange={handleChange}
                                className='border rounded-lg focus-within:ring-2 focus-within:ring-blue-500'
                            />
                        </div><br />
                        <Button onClick={handleSubmit}>Create</Button>
                        <div className='flex justify-between'>
                            <p>Want to join a community</p> <p>Join</p>
                        </div>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export const CommunityJoin = () => {
    const [name, setName] = useState('')

    const handleSubmit = async () => {

        try {
            const req = await axios.post('/api/community/join', { name })

            if (req.data.message) {
                toast.success(req.data.message)
                setName('')
            } else if (req.data.error) {
                toast.error(req.data.error)
            } else {
                toast.error('Failed to join community')
            }
        } catch (error: any) {
            NextResponse.json({ error: 'Something went wrong' })
        }
    }

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant='outline' className='text-primary hover:text-primary'>Join Community</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Join Community</DialogTitle>
                    </DialogHeader>
                    <div className='flex flex-col gap-3'>
                        <div className="flex flex-col gap-2">
                            <p className='font-semibold'>Name</p>
                            <Input value={name} placeholder='Community Name' onChange={(e) => setName(e.target.value)} />
                        </div>
                        <br />
                        <Button onClick={handleSubmit}>Join</Button>
                        <div className='flex justify-between'>
                            <p>Want to create a community</p> <p>Create</p>
                        </div>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    )
}