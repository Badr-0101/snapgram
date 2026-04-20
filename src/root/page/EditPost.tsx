import React from 'react'
import PostForm from '@/components/ui/formcomponents/PostForm'
import { useParams } from 'react-router-dom'
import { useGetPostById } from '@/lib/react-query/queriesAndMutations'
import Loader from '@/components/ui/shared/Loader'
import add from '@/assets/icons/add-post.svg'
const EditPost = () => {
  const  params  = useParams()
  const { data: post, isPending } = useGetPostById(params.id ||'')
  console.log(params.id)
  if(isPending){
    return (
      <div className="flex-center w-screen h-screen">
        <Loader />
      </div>
    )
  }
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className=' w-full flex-start gap-3 justify-start max-w-5xl '>
          <img src={add}
            width={36}
            height={36}
            alt='add'
          />
          <h2 className='h3-bold md:h2-bold text-left w-full'>edit post</h2>
        </div>
         <PostForm post={post} action='Update'/>
      </div>
     
    </div>
  )
}

export default EditPost
