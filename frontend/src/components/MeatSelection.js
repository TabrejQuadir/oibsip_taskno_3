import React from 'react';

const MeatSelection = ({ meats, selection, handleSelectionChange, handleStepChange }) => {
    const onRadioChange = (event) => {
        handleSelectionChange('meat')(event);
        handleStepChange();
    };
    return (
        <div className="transition-transform transform bg-gradient-to-br from-yellow-200 via-red-200 to-orange-300 p-6 rounded-3xl shadow-lg animate-fadeIn">
            <div className="relative flex flex-col items-center justify-center ">
                {/* Emoji Decoration */}
                <span className="absolute text-3xl -top-4 left-24 animate-bounce hidden sm:block">🐔 </span>
                <span className="absolute text-3xl -top-4 right-24 animate-bounce hidden sm:block">🐔</span>

                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-black to-red-400">
                    Choose a Meat
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                {meats.map(meatOption => (
                    <div key={meatOption.name} className="relative flex flex-col items-center p-2 bg-white rounded-lg shadow-lg border border-teal-300 transition-transform duration-300 hover:scale-105 hover:shadow-2xl group animate-fadeUl">
                        <input
                            type="radio"
                            id={meatOption.name}
                            name="meat"
                            value={meatOption.name}
                            checked={selection.meat === meatOption.name}
                            onChange={onRadioChange}
                            className="peer hidden"
                        />
                        <label
                            htmlFor={meatOption.name}
                            className={`flex flex-col items-center p-4 rounded-full transition-transform duration-300 ease-in-out cursor-pointer group-hover:bg-red-100 group-hover:shadow-xl peer-checked:bg-red-200 peer-checked:shadow-2xl animate-fadeLi`}
                        >
                            <span className="mt-2 text-lg font-semibold text-black transition-colors duration-300 group-hover:text-red-600 animate-fadeLi">
                                {meatOption.name}
                            </span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MeatSelection;
