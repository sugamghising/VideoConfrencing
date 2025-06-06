import CallList from '@/components/CallList'
import React from 'react'

const Upcoming = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-grey-950'>
      <h1 className='text-3xl font-bold'>
          Upcoming Meeting
      </h1>

      <CallList type='upcoming'/>
    </section>
  )
}

export default Upcoming