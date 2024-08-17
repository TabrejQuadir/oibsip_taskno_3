import React from 'react';
import cheese from "../utils/images/Cheese.jpg"

const CheeseSelection = ({ cheeses, selection, handleSelectionChange, handleStepChange }) => {
    const onRadioChange = (event) => {
        handleSelectionChange('cheese')(event);
        handleStepChange();
    };
    return (
        <div className="transition-transform transform bg-gradient-to-br from-yellow-200 via-red-200 to-orange-300 p-6 rounded-3xl shadow-lg animate-fadeIn">
            <div className="relative flex flex-col items-center justify-center ">
                {/* Emoji Decoration */}
                <span className="absolute text-3xl -top-4 left-11 animate-bounce hidden sm:block">
                    <img src={cheese} className='sm:size-0 md:size-14  lg:size-16  rounded-full' />
                </span>
                <span className="absolute text-3xl -top-4 right-11 animate-bounce hidden sm:block">
                    <img src={cheese} className='sm:size-0 md:size-14 lg:size-16 ' />
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-teal-500 to-red-700">
                    Choose a Cheese
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {cheeses.map(cheeseOption => (
                    <div key={cheeseOption.name} className="relative flex flex-col items-center py-2 px-8 bg-white rounded-lg shadow-lg border border-teal-300 transition-transform duration-300 hover:scale-105 hover:shadow-2xl group animate-fadeUl">
                        <input
                            type="radio"
                            id={cheeseOption.name}
                            name="cheese"
                            value={cheeseOption.name}
                            checked={selection.cheese === cheeseOption.name}
                            onChange={onRadioChange}
                            className="peer hidden"
                        />
                        <label
                            htmlFor={cheeseOption.name}
                            className={`flex flex-col items-center p-3 rounded-full  transition-transform duration-300 ease-in-out cursor-pointer group-hover:bg-yellow-100 group-hover:shadow-xl peer-checked:bg-yellow-200 peer-checked:shadow-2xl animate-fadeLi`}
                        >
                            <span className="mt-2 text-md text-nowrap font-semibold text-black transition-colors duration-300 group-hover:text-yellow-600 animate-fadeLi">
                                {cheeseOption.name}
                            </span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheeseSelection;
