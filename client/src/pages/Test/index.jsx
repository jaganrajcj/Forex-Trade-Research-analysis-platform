import React from 'react'
import './styles.css'
const Test = () => {
    return (
        <div className="text-black bg-white h-full">
            Test

            <div className="dropdown relative inline-block bg-gray-200">
                <button className="bg-green text-black px-5 b-0 ">Dropdown</button>
                <div className="dropdown-content hidden absolute bg-blue-gray-200 shadow-md z-10">
                    <a href="#" className='block p-3 text-black'>Link 1</a>
                    <a href="#" className='block p-3 text-black'>Link 2</a>
                    <a href="#" className='block p-3 text-black'>Link 3</a>
                </div>
            </div>

        </div>
    )
}

export default Test