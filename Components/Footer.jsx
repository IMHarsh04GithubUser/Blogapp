'use client'
import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center'>
      <p className="text-3xl font-extrabold text-cyan-800 animate-pulse">Blogify</p>
      <p className='text-sm text-white'>All right reserved. Copyright @Blogify</p>
        <div className='flex'>
            <Image src={assets.facebook_icon} alt='' width={40} />
            <Image src={assets.twitter_icon} alt='' width={40} />
            <Image src={assets.googleplus_icon} alt='' width={40} />
        </div>
    </div>
  )
}

export default Footer
