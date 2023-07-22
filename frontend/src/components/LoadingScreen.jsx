import React from 'react'
import DummyCard from './DummyCard'
import SpinningLoader from './SpinningLoader'

const LoadingScreen = () => {
  return (
    <div className='w-full    relative '>
        
    <div className='grid grid-cols-2   sm:grid-cols-3 lg:grid-cols-4 m-2   sm:gap-4'>
        <DummyCard/>
        <DummyCard/>
        
    </div>

        <div role="status " className=' opacity-60 absolute top-[40%] left-1/2 text-center  '  >

            <SpinningLoader/>
        </div>
    </div>
  )
}

export default LoadingScreen