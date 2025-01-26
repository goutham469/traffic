import React from 'react'
import Sites from '../common/Sites'
import Header from '../common/Header'

function LogData() {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='System Log insights' />
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <Sites />
        Log Data
      </main>
    </div>
  )
}

export default LogData