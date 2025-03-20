"use client"

import { Search } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'
import { useSearchParams } from 'next/navigation'
import { searchAction } from '@/actions/search'

const ArticleSearchInput = () => {

  const searchParams=useSearchParams();
  
  return (
    <form  action={searchAction} className='mx-auto max-w-2xl'>
      <div className='relative'>
        <Search className='h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2'/>
        <Input type="text" name='search' placeholder='Search articles..' className='w-full pl-10 pr-4 py-6 text-lg' defaultValue={searchParams.get("search")||""}/>
      </div>
    </form>
    
  )
}

export default ArticleSearchInput