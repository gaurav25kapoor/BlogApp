import React from 'react'
import { Card } from '../ui/card'
import Image from 'next/image'
import { Avatar } from '../ui/avatar'
import { AvatarFallback, AvatarImage } from '../ui/avatar'
import { Search } from 'lucide-react'
import type { Prisma } from '@prisma/client'


type AllArticlePageProps={
  articles:Prisma.ArticlesGetPayload<{
    include:{
      author:{
        select:{
          name:true,
          email:true,
          imageUrl:true
        }
      }
    }
  }>[]
}
const AllArticlePage :React.FC<AllArticlePageProps>=async ({articles}) => {


  if(!articles.length){
    return <NoSearchResults/>
  }
  return (
    <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      {articles.map((article)=>(
        <Card key={article.id} className='group relative overflow-hidden translate-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-violet-400 dark:hover:shadow-2xl dark:hover:shadow-violet-400'>
        <div className="p-6">
          <div className='relative mb-4 h-48 w-full overflow-hidden rounded-xl'>
            <Image src={article.featuredImage} fill alt='blog-image' className="obejct-cover"/>
          </div>

          <h3 className='font-semibold text-xl'>{article.title}</h3>
          <p className='mt-2'>{article.category}</p>
          <div className='flex items-center justify-between mt-6'>
            <div className='flex items-center gap-3'> 
              <Avatar>
                <AvatarImage src={article.author.imageUrl as string}/>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className='text-sm'>{article.author.name}</span>
            </div>

            <div className='text-sm'>
              {article.createdAt.toDateString()}
            </div>
          </div>
        </div>
      </Card>
      ))}
      
    </div>
  )
}

export default AllArticlePage


const NoSearchResults=()=>{
  return(
    <div className='flex flex-col items-center justify-center p-8 text-center'>
      <div className="mb-4 rounded-full bg-muted p-4">
        <Search className='h-8 w-8'/>

      </div>
      <h3 className='font-bold'>No Result found</h3>
      <p className='mt-2 text-sm'>We could not find any articles matching your search. Try a different
      keyword or phrase.</p>

    </div>
  )
}