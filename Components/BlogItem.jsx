'use client'
import { assets, blog_data } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogItem = ({title,description,category,image,id}) => {

  return (
    <div className='max-w-[330px] sm:max-w-[300px] bg-white border border-cyan-200 transition-all shadow shadow-yellow-100 rounded-xl hover:shadow-yellow-600 hover:shadow-2xl hover:scale-110'>
      <Link href={`/blogs/${id}`}>
      <Image src={image} alt='' width={400} height={400} className='border-b rounded-xl hover:scale-110' />
      </Link>
      <p className='ml-5 mt-5 px-1 inline-block text-green-600 text-sm'>{category}</p>
      <div className="p-5">
        <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-900'>{title}</h5>
        <p className='mb-3 text-sm tracking-tight text-gray-700' dangerouslySetInnerHTML={{"__html":description.slice(0,120)}}></p>
        <Link href={`/blogs/${id}`} className='inline-flex items-center py-2 font-semibold text-center hover:text-red-600'>
            Read more <Image src={assets.arrow} className='ml-2' alt='' width={12} />
        </Link>
      </div>
    </div>
  )
}

export default BlogItem
