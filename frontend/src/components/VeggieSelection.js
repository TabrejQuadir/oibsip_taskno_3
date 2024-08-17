import React from 'react';
import veggie from "../utils/images/Veggie.png"

const VeggiesSelection = ({ veggieOptions, veggies, handleVeggieChange }) => {
    return (
        <div className="transition-transform transform bg-gradient-to-br from-yellow-200 via-red-200 to-orange-300 p-6 rounded-3xl shadow-lg animate-fadeIn">
             <div className="relative flex flex-col items-center justify-center ">
                {/* Emoji Decoration */}
                <span className="absolute text-3xl -top-4 left-11 animate-bounce hidden sm:block"> 
                <img src={veggie} className='sm:size-0 md:size-14  lg:size-16  rounded-full'/>
                </span>
                <span className="absolute text-3xl -top-4 right-11 animate-bounce hidden sm:block">
                <img src={veggie} className='sm:size-0 md:size-14 lg:size-16 rounded-full rotate-90'/>
                </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-green-500 to-red-700">
                Choose Your Veggies
            </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                {veggieOptions.map(veggieOption => (
                    <div key={veggieOption.name} className="relative flex flex-col items-center p-2 bg-white rounded-lg shadow-lg border border-teal-300 transition-transform duration-300 hover:scale-105 hover:shadow-2xl group animate-fadeUl">
                        <input
                            type="checkbox"
                            id={veggieOption.name}
                            name="veggie"
                            value={veggieOption.name}
                            checked={veggies?.includes(veggieOption.name)}
                            onChange={handleVeggieChange}
                            className="peer hidden"
                        />
                        <label
                            htmlFor={veggieOption.name}
                            className={`flex flex-col items-center p-4 rounded-full transition-transform duration-300 ease-in-out cursor-pointer group-hover:bg-green-100 group-hover:shadow-xl peer-checked:bg-green-200 peer-checked:shadow-2xl animate-fadeLi`}
                        >
                            <span className="mt-2 text-lg font-semibold text-black transition-colors duration-300 group-hover:text-green-600 animate-fadeLi">
                                {veggieOption.name}
                            </span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VeggiesSelection;
