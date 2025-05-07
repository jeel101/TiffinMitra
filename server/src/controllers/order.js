const orderModel = require('../models/order')
const foodModel = require('../models/food')
const { sendEmail } = require('../utils/sendEmail')
exports.addOrder = async (req, res) => {
    try {
        const user = req.user._id;
        if (!user)
            return res.status(400).json({ message: "Plzz Login to make orders" });
        const data = req.body;
        const obj = { user, ...data }
        const order = await orderModel.create(obj);
        const food = await foodModel.findById(data.food)
        const quantity = food.quantity - data.quantity
        await foodModel.findByIdAndUpdate(food._id, { $set: { quantity } })
        const subject = "Ordered: Your Order for Food is Successfull"
        const message = `Hi ${req.user.name} \n Your Order for ${food.name} is Successfull \n Thank You`
        const email = req.user.email

        await sendEmail({ email, subject, message });
        return res.status(200).json({ order });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.getUserOrders = async (req, res) => {
    try {
        const user = req.user._id;
        if (!user)
            return res.status(400).json({ message: "Plzz Login to fetch orders" });

        const orders = await orderModel.find({ user }).populate("food user provider")
        if (!orders)
            return res.status(404).json({ message: "No orders Found" });

        return res.status(200).json({ orders });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.getProvidersOrders = async (req, res) => {
    try {
        const provider = req.provider._id;
        if (!provider)
            return res.status(400).json({ message: "Plzz Login to fetch orders" });

        const orders = await orderModel.find({ provider }).populate("user food").sort({ createdAt: -1 })

        if (!orders)
            return res.status(404).json({ message: "No orders Found" });

        return res.status(200).json({ orders });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.deleteOrder = async (req, res) => {
    try {
        const { _id } = req.params;
        if (!_id)
            return res.status(404).json({ message: "Invalid Request" });

        await orderModel.findByIdAndDelete(_id);

        return res.status(200).json({ message: "Order Deleted Successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
exports.updateOrderStatus = async (req, res) => {
    try {
      const { status, _id, user, provider, food, quantity } = req.body;
  
      if (!_id) return res.status(400).json({ message: "No Order Found" });
  
      const updatedOrder = await orderModel.findByIdAndUpdate(
        _id,
        { orderStatus: status },
        { new: true }
      ).populate("user food");
  
      let subject, message, email;
  
      if (status === "Delivered") {
        subject = "Delivered: Your Order was successfully delivered!";
        message = `Hi ${user.name}, your order for ${food.name} has been delivered. Thank you!`;
        email = user.email;
      } else {
        subject = "Cancelled: Your Order was cancelled.";
        message = `Hi ${provider.name}, order for ${food.name} was cancelled by ${user.name}.`;
        email = provider.email;
  
        await foodModel.findByIdAndUpdate(food._id, {
          $inc: { quantity: quantity }
        });
      }
  
      await sendEmail({ email, subject, message });
  
      return res.status(200).json({ updatedOrder });
  
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };