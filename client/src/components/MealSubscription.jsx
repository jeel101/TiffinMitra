import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MdEmail, MdDateRange } from 'react-icons/md'
import { RiIncreaseDecreaseLine } from 'react-icons/ri'
import { FiUser, FiPhone, FiClock } from 'react-icons/fi'
import { addOrder } from '../redux/order/order.action'
import { useNavigate, useParams } from 'react-router-dom'

function MealSubscription() {
  const user = useSelector((state) => state.user.user)
  const food = useSelector((state) => state.foods.food) // ✅ FIXED: correct selector
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { provider, food: foodSlug } = useParams()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setMobileNumber(user.phoneNumber)
    } else {
      setName('')
      setEmail('')
    }
  }, [user])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!food) {
      return window.alert("Food item not found. Please try again later.")
    }

    if (!user) {
      return window.alert("Please Login to Make Order")
    }

    if (quantity > food.quantity) {
      return window.alert("Cannot Provide in this much Quantity")
    }

    let totalAmount = food.price * quantity

    const data = {
      user: user._id,
      food: food._id,
      provider: food.provider,
      quantity,
      address,
      time,
      date,
      totalAmount,
    }

    let options = {
      key: 'rzp_test_yu67T9aDVZ2U2O',
      amount: Number(totalAmount) * 100,
      currency: 'INR',
      name: 'TiffinMitra',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      handler: function (response) {
        if (response.razorpay_payment_id) {
          data.paymentStatus = 'Success'
          dispatch(addOrder(data))
          window.alert('Order Placed Successfully')
          navigate('/orders')
        } else {
          window.alert('Unable To Place Order Try Again')
        }
      },
      prefill: {
        name: `${user.name}`,
        email: `${user.email}`,
        contact: user.phoneNumber || '9999999999',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    }

    const rzp1 = new window.Razorpay(options)
    rzp1.open()
  }

  if (!food || typeof food.quantity !== 'number') {
    return <div className="text-center mt-10 text-red-600">Loading food details... Please try again later.</div>
  }

  return (
    <div className="">
      <form action="" className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <h2 className="font-semibold text-xl text-center md:py-0 py-4">Order Your Tiffin Now</h2>

        {/* Name */}
        <div>
          <label htmlFor="name" className="font-semibold">Name</label>
          <div className="flex items-center border bg-white w-full">
            <span className="px-2 h-full"><FiUser /></span>
            <input type="text" value={name} name="name" placeholder="Enter Your Name"
              className="w-full h-full px-2 py-2 border-l focus:outline-none"
              id="name" required onChange={(e) => setName(e.target.value)} />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="font-semibold">Email</label>
          <div className="flex items-center border bg-white w-full">
            <span className="px-2 h-full"><MdEmail /></span>
            <input type="email" value={email} name="email" placeholder="Enter Your Email"
              className="w-full h-full px-2 py-2 border-l focus:outline-none"
              id="email" required onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>

        {/* Mobile Number */}
        <div>
          <label htmlFor="phone" className="font-semibold">Mobile Number</label>
          <div className="flex items-center border bg-white w-full">
            <span className="px-2 h-full"><FiPhone /></span>
            <input type="tel" value={mobileNumber} name="phone" placeholder="Enter Your Mobile Number"
              className="w-full h-full px-2 py-2 border-l focus:outline-none"
              id="phone" required onChange={(e) => setMobileNumber(e.target.value)} />
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantity" className="font-semibold">Quantity</label>
          <div className="flex items-center border bg-white w-full">
            <span className="px-2 h-full"><RiIncreaseDecreaseLine /></span>
            <input type="number" min={1} value={quantity} name="quantity" placeholder="Enter Quantity"
              className="w-full h-full px-2 py-2 border-l focus:outline-none"
              id="quantity" required onChange={(e) => setQuantity(Number(e.target.value))} />
          </div>
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="font-semibold">Date</label>
          <div className="flex items-center border bg-white w-full">
            <span className="px-2 h-full"><MdDateRange /></span>
            <input type="date" value={date} name="date"
              className="w-full h-full px-2 py-2 border-l focus:outline-none"
              id="date" required onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>

        {/* Time */}
        <div>
          <label htmlFor="time" className="font-semibold">Time</label>
          <div className="flex items-center border bg-white w-full">
            <span className="px-2 h-full"><FiClock /></span>
            <input type="time" value={time} name="time"
              className="w-full h-full px-2 py-2 border-l focus:outline-none"
              id="time" required onChange={(e) => setTime(e.target.value)} />
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="font-semibold">Address</label>
          <textarea value={address} name="address" rows={4}
            placeholder="Enter Your Address"
            className="w-full h-full px-2 py-2 my-2 border focus:outline-none"
            id="address" required onChange={(e) => setAddress(e.target.value)} />
        </div>

        {/* Submit */}
        <div>
          <input type="submit" value="Order Meal"
            className="bg-slate-900 text-white rounded px-3 py-2 cursor-pointer w-full" />
        </div>
      </form>
    </div>
  )
}

export default MealSubscription
