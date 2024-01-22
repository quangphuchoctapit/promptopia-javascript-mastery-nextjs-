import React, { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
    const { data: session } = useSession()
    const pathName = usePathname()

    const [copied, setCopied] = useState('')

    const handleCopy = () => {
        setCopied(post.prompt)
        navigator.clipboard.writeText(post.prompt)
        setTimeout(() => {
            setCopied('')
        }, 3000)
    }

    console.log(copied)
    return (
        <div className='p-3 shadow-xl bg-white rounded-lg flex flex-col'>
            <div className='flex flex-col justify-between items-start gap-5'>
                <div
                    className='flex-1 flex justify-between items-center gap-3 cursor-pointer w-full'
                // onClick={handleProfileClick}
                >
                    <div className="flex justify-start gap-3">
                        <Image
                            src={post.creator.image}
                            alt='user_image'
                            width={40}
                            height={40}
                            className='rounded-full object-contain'
                        />

                        <div className='flex flex-col'>
                            <h3 className='font-satoshi font-semibold text-gray-900'>
                                {post.creator.username}
                            </h3>
                            <p className='font-inter text-sm text-gray-500'>
                                {post.creator.email}
                            </p>
                        </div>
                    </div>
                    <div className="copy_btn flex justify-end"
                        onClick={() => { handleCopy() }}>
                        <Image
                            alt='copy button'
                            src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                            width={12}
                            height={12}
                        />
                    </div>
                </div>
                <p className='my-2 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
                <p className='font-inter text-sm blue_gradient cursor-pointer'
                    onClick={() => handleTagClick && handleTagClick(post.tag)}
                >{post.tag}</p>
                {session?.user.id === post.creator._id && pathName === '/profile' && (
                    <div className='mt-3 border-t border-gray-300 pt-3 flex justify-center items-center gap-3 w-full'>
                        <p onClick={() => handleEdit(post)} className='font-inter text-sm green_gradient cursor-pointer'>Edit</p>
                        <p onClick={() => handleDelete(post)} className='font-inter text-sm orange_gradient cursor-pointer'>Delete</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PromptCard
