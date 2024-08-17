import React from 'react';
import sauce from "../utils/images/Sauce.jpg"

const SauceSelection = ({ sauces, selection, handleStepChange, handleSelectionChange }) => {

    const onRadioChange = (event) => {
        handleSelectionChange('sauce')(event);
        handleStepChange();
    };

    return (
        <div className="transition-transform transform bg-gradient-to-br from-yellow-200 via-red-200 to-orange-300 p-6 rounded-3xl shadow-lg animate-fadeIn">

             <div className="relative flex flex-col items-center justify-center ">
                {/* Emoji Decoration */}
                <span className="absolute text-3xl -top-4 left-11 animate-bounce hidden sm:block"> 
                <img src={sauce} className='sm:size-0 md:size-14  lg:size-16  rounded-full'/>
                </span>
                <span className="absolute text-3xl -top-4 right-11 animate-bounce hidden sm:block">
                <img src={sauce} className='sm:size-0 md:size-14 lg:size-16  rounded-full'/>
                </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-red-500">
                Choose a Sauce
            </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 ">
                {sauces?.map(sauceOption => (
                    <div key={sauceOption.name} className="relative flex flex-col items-center p-2 bg-white rounded-lg shadow-lg border border-teal-300 transition-transform duration-300 hover:scale-105 hover:shadow-2xl group animate-fadeUl">
                        <input
                            type="radio"
                            id={sauceOption.name}
                            name="sauce"
                            value={sauceOption.name}
                            checked={selection.sauce === sauceOption.name}
                            onChange={onRadioChange}
                            className="peer hidden"
                        />
                        <label
                            htmlFor={sauceOption.name}
                            className={`flex flex-col items-center py-2 whitespace-nowrap rounded-full transition-transform duration-300 ease-in-out cursor-pointer group-hover:bg-red-100 group-hover:shadow-xl peer-checked:bg-red-200 peer-checked:shadow-2xl animate-fadeLi`}
                        >
                            <span className="mt-2 text-md font-semibold text-black transition-colors duration-300 group-hover:text-red-600 animate-fadeLi">
                                {sauceOption.name}
                            </span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SauceSelection;
