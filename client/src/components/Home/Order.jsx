import React, { useState } from 'react';
import ProviderCard from '../ProviderCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReviewModal from '../ReviewModal'; // Correct import path

const Order = ({ setShowReviewModal}) => {
    const providers = useSelector((state) => state.provider.allProviders);
    const [rating, setRating] = useState(0);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [isPaid, setIsPaid] = useState(false);
    const [openReviewModal, setOpenReviewModal] = useState(false);

    // Handle provider selection and show review modal
    const handleProviderSelection = (providerId) => {
        setSelectedProvider(providerId);
        setOpenReviewModal(true);  // Open the review modal when provider is selected
    };

    const handlePayment = async () => {
        if (!selectedProvider) {
            alert("Please select a provider before payment.");
            return;
        }

        try {
            const { data } = await axios.post('http://localhost:5000/api/payment/orders', {
                amount: 100, // Modify as needed
            });

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: data.order.amount,
                currency: "INR",
                name: "Tiffin Service",
                description: "Payment for Tiffin Order",
                order_id: data.order.id,
                handler: async function (response) {
                    const verifyResponse = await axios.post('http://localhost:5000/api/payment/success', {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        providerId: selectedProvider,
                        rating
                    });

                    console.log(verifyResponse.data);
                    alert(verifyResponse.data.message);
                    setIsPaid(true);
                },
                prefill: {
                    name: "User Name",
                    email: "user@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error('Payment failed:', error);
            alert('Payment failed. Please try again.');
        }
    };

    return (
        <>
            {providers && (
                <div className='lg:px-12 md:px-8 px-2.5'>
                    <h2 className='text-2xl font-semibold py-2'>Order Your Tiffin Online</h2>

                    <div className='md:grid grid-cols-3 hidden items-center gap-4'>
                        {providers.map((item, index) => (
                            <ProviderCard 
                                key={index}
                                name={item.name} 
                                providerLogo={item.providerLogo} 
                                address={item.address} 
                                rating={item.rating} 
                                id={item._id} 
                                onClick={() => handleProviderSelection(item._id)} // Open review modal on click
                            />
                        ))}
                    </div>

                    <div className='md:hidden grid sm:grid-cols-2 grid-cols-1 items-center gap-2.5 justify-around'>
                        {providers.map((item, index) => (
                            <ProviderCard 
                                key={index}
                                name={item.name} 
                                providerLogo={item.providerLogo} 
                                address={item.address} 
                                rating={item.rating} 
                                id={item._id} 
                                onClick={() => handleProviderSelection(item._id)} // Open review modal on click
                            />
                        ))}
                    </div>

                    <div className='md:py-6 py-4 flex justify-center w-full'>
                        <Link to='/providers' className='px-2 py-1 text-white bg-slate-900 rounded font-semibold'>More Providers</Link>
                    </div>

                    {/* Payment Button */}
                    {!isPaid ? (
                        <div className="flex flex-col justify-center items-center mt-4">
                            <h3 className="text-lg font-semibold">Rate Your Provider:</h3>
                            <input 
                                type="number" 
                                value={rating} 
                                onChange={(e) => setRating(e.target.value)} 
                                className="border px-2 py-1 rounded"
                                min="1" max="5"
                            />

                            <button 
                                onClick={handlePayment} 
                                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                            >
                                Complete Payment
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-center mt-4">
                            <h3 className="text-lg font-semibold text-green-700">Payment Completed! Thank you for your feedback.</h3>
                        </div>
                    )}
                </div>
            )}

            {/* Review Modal */}
            <ReviewModal 
                open={openReviewModal} 
                setOpen={setOpenReviewModal} 
                providerId={selectedProvider} 
                rating={rating}
            />
        </>
    );
};

export default Order;
