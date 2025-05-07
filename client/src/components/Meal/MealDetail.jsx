import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Skeleton from '../Skeleton';

function MealDetail() {
  const mealData = useSelector((state) => state.foods.food);
  const [loading, setLoading] = useState(true);

  console.log("mealData from Redux:", mealData);
  console.log("Raw diet value:", mealData?.diet);

  const fallbackImage = "https://via.placeholder.com/400x300?text=No+Image";

  const getDietLabel = (diet) => {
    if (!diet) return { label: "N/A", icon: "⚪", color: "text-gray-500" };

    const norm = diet.toLowerCase();
    if (norm === "veg" || norm === "vegetarian") {
      return { label: "Veg", icon: "🟢", color: "text-green-600" };
    } else if (
      norm === "nonveg" ||
      norm === "non veg" ||
      norm === "non-veg" ||
      norm === "non-vegetarian"
    ) {
      return { label: "Non-Veg", icon: "🔴", color: "text-red-600" };
    } else {
      return { label: diet, icon: "⚪", color: "text-gray-500" };
    }
  };

  const { label: dietLabel, icon: dietIcon, color: dietColor } = getDietLabel(mealData?.diet);

  return (
    <>
      {mealData && (
        <div className='pb-4'>
          {/* Image */}
          <div className='mealImage' style={{ height: '380px' }}>
            {loading && <Skeleton />}
            <img
              src={mealData.image || fallbackImage}
              alt={mealData.name}
              className={`${loading ? 'hidden' : 'block'} h-full w-full rounded-lg overflow-hidden object-cover`}
              onLoad={() => setLoading(false)}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackImage;
              }}
            />
          </div>

          {/* Text Info */}
          <div className='flex flex-col gap-4 py-4 h-auto'>
            <h3 className='font-semibold text-2xl'>{mealData.name}</h3>
            <h6 className='font-semibold'>
              Diet: <span className={`${dietColor} font-semibold`}>{dietIcon} {dietLabel}</span>
            </h6>
            <p className='font-semibold'>Price: <span className='text-slate-900 font-normal'>₹{mealData.price}/meal</span></p>
            <p className='font-semibold'>Quantity Left: <span className='font-normal'>{mealData.quantity}</span></p>

            <h6 className='font-semibold'>Description:</h6>
            <p className='text-gray-500'>{mealData.description}</p>

            {/* Section Header */}
            <h6 className='font-semibold pt-4 text-lg'>Meal Info</h6>

            {/* Grid Section */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3'>
              <p className='font-semibold'>
                Ingredients: <span className='text-gray-600 font-normal'>{mealData.ingredients?.join(", ") || 'N/A'}</span>
              </p>
              <p className='font-semibold'>
                Flavor Profile: <span className='text-gray-600 font-normal'>{mealData.flavor_profile || 'N/A'}</span>
              </p>
              <p className='font-semibold'>
                Cook Time(minutes): <span className='text-gray-600 font-normal'>{mealData.cook_time || 'N/A'}</span>
              </p>
              <p className='font-semibold'>
                Course: <span className='text-gray-600 font-normal'>{mealData.course || 'N/A'}</span>
              </p>
              <p className='font-semibold'>
                State: <span className='text-gray-600 font-normal'>{mealData.state || 'N/A'}</span>
              </p>
              <p className='font-semibold'>
                Region: <span className='text-gray-600 font-normal'>{mealData.region || 'N/A'}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MealDetail;
