import React from 'react'
import Link from 'next/link'

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
    return (
        <section className='w-full max-w-full flex-start flex-col'>
            <h1 className='head_text text-left'>
                <span className='blue_gradient'>{type} Post</span>
            </h1>
            <p className='desc text-left max-w-md'>
                {type} and share amazing prompts with the world,
                and let your imagination run with any AI-Powered platform.
            </p>
            <form className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism' onSubmit={handleSubmit}>
                <label htmlFor="">
                    <span className='font-satoshi mt-10 font-semibold text-base text-gray-700'>Your AI Prompt</span>
                </label>
                <textarea value={post.prompt}
                    onChange={e => setPost({ ...post, prompt: e.target.value })}
                    placeholder='Write your prompt here...'
                    className='form_textarea'
                    required
                ></textarea>
                <label htmlFor="">
                    <span className='font-satoshi mt-10 font-semibold text-base text-gray-700'>Tag </span>
                    <span className='text-sm text-gray-500'>(#product, #webdevelopment, #idea)</span>
                </label>
                <input
                    value={post.tag}
                    onChange={e => setPost({ ...post, tag: e.target.value })}
                    placeholder='#tag'
                    className='form_input'
                    required
                />
                <div className="justify-end mx-3 mb-5 gap-4 flex items-center">
                    <Link className='text-gray-500 text-sm' href='/'>Cancel</Link>
                    <button className='rounded-full px-4 py-2 text-white bg-orange-500 hover:duration-200 hover:bg-orange-600' type='submit' disabled={submitting}>
                        {submitting ? `${type}...` : type}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default Form
