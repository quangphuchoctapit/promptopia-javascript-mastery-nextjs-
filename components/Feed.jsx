'use client'

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className='mt-16 '>
            {data.map((item) => (
                <PromptCard
                    key={item._id}
                    post={item}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}

const Feed = () => {
    const [searchText, setSearchText] = useState('')
    const [posts, setPosts] = useState([])

    const handleSearchChange = (e) => {

    }

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch('/api/prompt')
            const data = await response.json()
            console.log(data)
            setPosts(data)
        }
        fetchPost()
    }, [])

    return (
        <section className='feed'>
            <form action="relative w-full flex-center">
                <input type="text" className='search_input peer' placeholder='Search for a tag or a username' value={searchText} onChange={handleSearchChange} required />
            </form>
            <PromptCardList
                data={posts}
                handleTagClick={() => { }}
            />
        </section>
    )
}

export default Feed
