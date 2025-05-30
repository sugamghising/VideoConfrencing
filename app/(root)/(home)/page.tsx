import React from 'react'
import MeetingTypeList from '@/components/MeetingTypeList'

const Home = () => {

  const now = new Date()
  const time =now.toLocaleTimeString('en-us',{hour:'2-digit',minute:'2-digit',hour12:true});
  const date = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
  }).format(now)

  return (
    <section className='flex size-full flex-col gap-10 text-grey-950'>
      <div className="h-[300px] w-full rounded-[20px]  heroBackgroundImage">
        <div className=" flex h-full flex-col justify-between max-md:px-5 max-md py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] text-center text-base font-normal text-amber-50">
            Upcoming Meeting at : 10 :00 AM
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className='text-4xl font-extrabold lg:text-7xl text-amber-50'>
              {time} 
            </h1>
            <p className='text-lg font-medium text-amber-50'>{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  )
}

export default Home