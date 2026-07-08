import React from 'react'
import { Link } from 'react-router-dom'

const SpeakToALawyer = () => {
  return (
    <div className='mb-10 mt-10 text-gray-700'>
      <h3 className='dark:text-gray-300 text-center tracking-widest italic text-gray-700 p-5'>Need Legal Assistance? Let’s Help You.</h3>

      {/* CTA */}
          <div className="text-center p-5">
            <Link 
              to="/appointment" 
              className="text-white bg-rose-400 hover:bg-rose-500 inline-block dark:bg-green-600 dark:hover:bg-green-700 dark:text-white px-10 py-4 rounded-full font-bold transition-all active:scale-95 shadow-xl dark:shadow-green-600/20 uppercase tracking-widest text-sm duration-300"
            >
              Schedule a Consultation
            </Link>
          </div>
    </div>
  )
}

export default SpeakToALawyer
