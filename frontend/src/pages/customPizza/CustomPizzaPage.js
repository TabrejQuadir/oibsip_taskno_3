import { getBases, getSauces, getCheeses, getVeggies, getMeats, addPizza } from '../../utils/pizzaApi';
import React, { useState, useEffect } from 'react';
import { useOrders } from '../../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../utils/authApi';
import img1 from "../../utils/images/Pizza-Base-5.jpg";
import CustomPizzaModal from '../../components/customPizzaModal/CustomPizzaModal';
import VeggiesSelection from '../../components/VeggieSelection';
import CheeseSelection from '../../components/CheeseSelection';
import SauceSelection from '../../components/SauceSelection';
import BaseSelection from '../../components/BaseSelection';
import MeatSelection from '../../components/MeatSelection';
import ErrorPage from '../../components/errorPage/ErrorPage';
import Loader from '../../components/loader/Loader';
import "./CustomPizza.css"

const CustomPizzaPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bases, setBases] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [cheeses, setCheeses] = useState([]);
    const [meats, setMeats] = useState([]);
    const [veggieOptions, setVeggieOptions] = useState([]);
    const [selection, setSelection] = useState({
        base: '',
        sauce: '',
        cheese: '',
        meat: '',
        veggies: [],
        price: 0
    });
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [closing, setClosing] = useState(false);
    const [step, setStep] = useState('base');
    const { addOrder } = useOrders();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [basesData, saucesData, cheesesData, veggiesData, meatsData] = await Promise.all([
                    getBases(),
                    getSauces(),
                    getCheeses(),
                    getVeggies(),
                    getMeats(),
                ]);
                setBases(basesData);
                setSauces(saucesData);
                setCheeses(cheesesData);
                setMeats(meatsData);
                setVeggieOptions(veggiesData);
            } catch (error) {
                setError('Failed to load pizzas');
            }
        };
        fetchData();
        const timer = setTimeout(() => {
            setLoading(false);
        }, 400);

        return () => clearTimeout(timer);
    }, []);

    const calculatePrice = () => {
        let price = 0;
        const base = bases.find(b => b.name === selection.base);
        if (base) price += base.price || 0;
        return price;
    };

    useEffect(() => {
        setSelection(prev => ({ ...prev, price: calculatePrice() }));
    }, [selection.base]);

    const handleVeggieChange = (event) => {
        const { value, checked } = event.target;
        setSelection(prev => ({
            ...prev,
            veggies: checked
                ? [...prev.veggies, value]
                : prev.veggies.filter(v => v !== value)
        }));
    };

    const handleSelectionChange = (type) => (event) => {
        setSelection(prev => ({ ...prev, [type]: event.target.value }));
    };

    const validateSelections = () => {
        const { base, sauce, cheese, meat, veggies } = selection;

        if (!base) {
            alert('Please select a pizza base.');
            return false;
        }

        if (!sauce) {
            alert('Please select a pizza sauce.');
            return false;
        }

        if (!cheese) {
            alert('Please select a type of cheese.');
            return false;
        }

        if (!meat) {
            alert('Please select a type of meat.');
            return false;
        }

        if (veggies.length === 0) {
            alert('Please select at least one veggie.');
            return false;
        }

        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateSelections()) {
            setModalIsOpen(true);
        }
    };

    const closeModal = () => {
        setClosing(true);
        setTimeout(() => {
            setModalIsOpen(false);
            setClosing(false);
        }, 200);
    };

    const confirmOrder = async () => {
        const { base, sauce, cheese, meat, veggies, price } = selection;
        const userProfile = await getUserProfile();
        const userId = userProfile._id;
        const newOrder = {
            base,
            sauce,
            cheese,
            meat,
            veggies,
            price,
            status: 'Pending',
            user: userId
        };
        try {
            await addPizza(newOrder);
            addOrder(newOrder);
            closeModal();
            setTimeout(() => {
                navigate("/dashboard");
            }, 200);
        } catch (error) {
            alert('Failed to add pizza. Please try again.');
        }
    };

    const handleStepChange = (nextStep) => {
        setStep(nextStep);
    };

    const handleBack = () => {
        if (step === 'sauce') setStep('base');
        else if (step === 'cheese') setStep('sauce');
        else if (step === 'meat') setStep('cheese');
        else if (step === 'veggies') setStep('meat');
    };

    const selectedBase = bases.find(b => b.name === selection.base);
    const pizzaImage = selectedBase ? img1 : '';

    if (loading) return <Loader />;
    if (error) return <ErrorPage errorMessage={error} />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-200 via-teal-300 to-red-200 flex items-center justify-center py-10">
            <div className="relative w-full max-w-3xl bg-opacity-70 backdrop-blur-lg p-8 rounded-md shadow-2xl overflow-hidden">
                {/* Background Overlay for Container */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-red-100 to-pink-100 opacity-20" />
                <div className="relative flex flex-col items-center justify-center">
                    {/* Emoji Decoration */}
                    <span className="absolute text-2xl md:text-3xl lg:text-4xl top-7 left-4 sm:left-20 md:left-24 lg:left-28 animate-pulse hidden sm:block">🍕</span>
                    <span className="absolute text-2xl md:text-3xl lg:text-4xl top-7 right-4 sm:right-20 md:right-24 lg:right-28 animate-pulse hidden sm:block">🍕</span>

                    {/* Heading */}
                    <h1 className="mt-6 text-2xl sm:text-4xl md:text-4xl font-extrabold mb-4 sm:mb-6 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-400 animate-text-shadow">
                        Customize Your Pizza
                    </h1>
                </div>


                <form onSubmit={handleSubmit} className="space-y-8 p-8 rounded-lg shadow-2xl">
                    {step === 'base' && (
                        <BaseSelection
                            bases={bases}
                            selection={selection}
                            handleStepChange={() => handleStepChange('sauce')}
                            handleSelectionChange={handleSelectionChange}
                        />
                    )}
                    {step === 'sauce' && (
                        <SauceSelection
                            sauces={sauces}
                            selection={selection}
                            handleStepChange={() => handleStepChange('cheese')}
                            handleSelectionChange={handleSelectionChange}
                        />
                    )}
                    {step === 'cheese' && (
                        <CheeseSelection
                            cheeses={cheeses}
                            selection={selection}
                            handleStepChange={() => handleStepChange('meat')}
                            handleSelectionChange={handleSelectionChange}
                        />
                    )}
                    {step === 'meat' && (
                        <MeatSelection
                            meats={meats}
                            selection={selection}
                            handleStepChange={() => handleStepChange('veggies')}
                            handleSelectionChange={handleSelectionChange}
                        />
                    )}
                    {step === 'veggies' && (
                        <VeggiesSelection
                            veggieOptions={veggieOptions}
                            veggies={selection.veggies}
                            handleVeggieChange={handleVeggieChange}
                        />
                    )}
                    <div className="flex justify-between">
                        {step !== 'base' && (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="px-4 py-2 bg-red-600 text-white font-bold rounded-md shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-red-300 animate-shadow"
                            >
                                Back
                            </button>
                        )}
                        <button
                            type="submit"
                            className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold rounded-md shadow-lg transition-transform transform hover:scale-105 hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 animate-shadow"
                        >
                            {step === 'veggies' ? 'Review Order' : 'Next'}
                        </button>
                    </div>
                </form>
            </div>
            <CustomPizzaModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                selection={selection}
                veggies={selection.veggies}
                pizzaImage={pizzaImage}
                confirmOrder={confirmOrder}
                setClosing={setClosing}
                closing={closing}
            />
        </div>
    );
};

export default CustomPizzaPage;
