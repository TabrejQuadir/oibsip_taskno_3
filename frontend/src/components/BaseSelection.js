import React from 'react';
import base from "../utils/images/Base.jpg"

const BaseSelection = ({ bases, selection, handleSelectionChange, handleStepChange }) => {
    const onRadioChange = (event) => {
        handleSelectionChange('base')(event);
        handleStepChange();
    };

    return (
        <div className="relative bg-gradient-to-br from-green-200 via-blue-200 to-purple-300 p-8 rounded-3xl shadow-xl animate-fadeIn">
             <div className="relative flex flex-col items-center justify-center ">
                {/* Emoji Decoration */}
                <span className="absolute text-3xl -top-4 left-11 animate-bounce hidden sm:block"> 
                <img src={base} className='sm:size-0 md:size-14  lg:size-16  rounded-full'/>
                </span>
                <span className="absolute text-3xl -top-4 right-11 animate-bounce hidden sm:block">
                <img src={base} className='sm:size-0 md:size-14 lg:size-16  rounded-full'/>
                </span>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Choose Your Base
            </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {bases.map(baseOption => (
                    <div key={baseOption.name} className="relative flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-lg border border-teal-300 transition-transform duration-300 hover:scale-110 hover:shadow-2xl group overflow-hidden animate-fadeUl">
                        <input
                            type="radio"
                            id={baseOption.name}
                            name="base"
                            value={baseOption.name}
                            checked={selection.base === baseOption.name}
                            onChange={onRadioChange}
                            className="peer hidden"
                        />
                        <label
                            htmlFor={baseOption.name}
                            className={`flex flex-col items-center justify-center py-4 px-3 rounded-full transition-transform duration-300 ease-in-out cursor-pointer group-hover:bg-indigo-200 group-hover:shadow-xl peer-checked:bg-indigo-300 peer-checked:shadow-2xl animate-fadeLi`}
                        >
                            <span className="text-lg font-semibold text-black transition-colors duration-300 group-hover:text-indigo-700">
                                {baseOption.name}
                            </span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BaseSelection;
