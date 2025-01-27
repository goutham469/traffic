import React from 'react'
import Header from '../common/Header'

function Help() {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
			<Header title='Help' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				 <Details/>
			</main>
		</div>
  )
}


function Details() {
  return (
    <div className='flex-1 overflow-auto relative z-10'>

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <h2 className='text-2xl font-semibold mb-4'>Contact Information</h2>
        
        <div className='space-y-4'>
          <div>
            <strong>Email:</strong>
            <p className='text-blue-600 cursor-pointer' onClick={()=>window.open("mailto:uppinurigouthamreddy@gmail.com" , "_blank")} >uppinurigouthamreddy@gmail.com</p>
          </div>
          
          <div>
            <strong>LinkedIn:</strong>
            <p className='text-blue-600'>
              <a href='https://www.linkedin.com/in/gouthamreddy2005/' target='_blank' rel='noopener noreferrer'>
                linkedin.com/in/gouthamreddy2005
              </a>
            </p>
          </div>

          <div>
            <strong>Website :</strong>
            <p className='text-blue-600'>
              <a href='https://goutham469.netlify.app' target='_blank' rel='noopener noreferrer'>
                goutham469
              </a>
            </p>
          </div>

          <div>
            <strong>Instagram:</strong>
            <p className='text-blue-600'>
              <a href='https://www.instagram.com/go.utham8129' target='_blank' rel='noopener noreferrer'>
                instagram.com/go.utham8129
              </a>
            </p>
          </div>

          <div>
            <strong>Phone:</strong>
            <p className='text-blue-600 cursor-pointer'   onClick={()=>window.open("tel:9398141936" , "_blank")}   >(+91) 9398141936</p>
          </div>
        </div>
      </main>
    </div>
  );
}


export default Help