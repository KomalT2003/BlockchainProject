import React from 'react'

function DataPage() {
  return (
    <div className='h-screen w-[100%] bkgrd'>
        <div className='flex flex-col w-[60%] h-full items-center justify-center'>
            <h1>Admin Account</h1>
            <div className='w-1/2 h-1/2 flex flex-col justify-around'>
                <p className='text-center'>Patient Data</p>
                <div className='flex justify-around' >
                  <button>Search</button>
                  <button>History</button>
                </div>
            </div>
        </div>
        <img src="" alt="Hello" />
    </div>
  )
}

export default DataPage