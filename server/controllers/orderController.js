const Cart = require('../models/cartModel');
const Coupon = require('../models/couponModel');
const coupon = require('../models/couponModel');
const Order = require('../models/orderModel');

const ORDER_STATUS = [
    "pending",
    "confirmed",
    "preparing",
    "out for delivery",
    "delivered",
  ];


exports.createOrder = async (req, res) => {
    try {
        const user = req.user.id


        const {
            restaurant,
            cartId,
            coupon,
            deliveryAddress,
        } = req.body;
        const findCoupon = await Coupon.findOne({ code:coupon }); 
        let order = await Order.findOne({user})
        // if (!order || order.status !== "pending") {
            order = new Order({
              user,
              restaurant,
              cartId,
              coupon:findCoupon?._id,
              deliveryAddress,
            });
          // } else {
          //   return res.status(400).json({ message: "An order is already in pending status" });
          // }
        await order.save();
        res.status(201).json({ message: "Order created successfully", order: order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAllOrders = async (req,res)=>{
    try{
        const user = req.user.id
        const orders = await Order.find({user}).sort({createdAt:-1})
        .populate("user", "name email phone")
        .populate("restaurant", "name location")
        .populate({
          path: "cartId",
          select: "items totalPrice",
          populate: {
            path: "items.foodId",
            select: "name",
          },
        })
        .populate("coupon", "code discountPercentage maxDiscountValue")
        .populate("deliveryAddress", "street city state zipCode")
        if(!orders){
            return res.status(404).json({message: "No orders found for this profile"})
        }
        res.status(200).json({message: "Orders found successfully", orders})
    }catch(error){
        res.status(500).json({message: error.message})
    }
  }



  exports.getMyOrders = async (req,res)=>{
    try{
        const user = req.params.userId
        const orders = await Order.find({user})
       

        if(!orders){
            return res.status(404).json({message: "No orders found for this profile"})
        }
        res.status(200).json({message: "Orders found successfully", orders})
    }catch(error){
        res.status(500).json({message: error.message})
    }
  }
  



  
  exports.getOrderById = async (req, res) => {
    try {
        const user = req.user.Id
      const { orderId } = req.params;
      const order = await Order.findOne({_id:orderId}, {user: user})
        .populate("user", "name email phone")
        .populate("restaurant", "name location")
        .populate({
          path: "cartId",
          select: "items totalPrice",
          populate: {
            path: "items.foodId",
            select: "name",
          },
        })
        .populate("coupon", "code discountPercentage maxDiscountValue")
        .populate("deliveryAddress", "street city state zipCode")
    
        if (!order) {
        return res.status(404).json({ message: "Order not found." });
      }
      res.status(200).json({ message: "Order retrieved successfully", order });
    } catch (error) {
      console.log(error);
      
      res.status(500).json({ message: error.message });
    }
  };

  exports.updateOrderUser = async (req,res)=>{
    try{
        const user = req.user.id
        const orderId  = req.params.orderId;
        const{coupon, status, deliveryAddress} = req.body
        const order = await Order.findById(orderId);

        if(!order){
            return res.status(404).json({message: "No order found"})
        }
        if(order.status === "cancelled"){
            return res.status(400).json({message: "Order is already cancelled"})
        }
        if(coupon) order.coupon = coupon
        if(deliveryAddress) order.deliveryAddress = deliveryAddress
        if(user.toString() === order.user._id.toString()){
            if(status){
                if(status === "cancelled"){
                    order.status = "cancelled"
                }else {
                    return res.status(400).json({ message: "Users are only allowed to cancel orders." });
                }
            }
        }
        await order.save()
        res.status(200).json({message: "Order update successfully", order: order})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

  exports.updateOrderStatus = async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found." });
      }
      const currentIndex = ORDER_STATUS.indexOf(order.status);
      if (currentIndex === -1 || currentIndex === ORDER_STATUS.length - 1) {
        return res
          .status(400)
          .json({ message: "Order is already in the final state." });
      }
      order.status = ORDER_STATUS[currentIndex + 1];
      await order.save();
      res.status(200).json({
        message: `Order status updated to '${order.status}'`,
        order,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  
  
  exports.getAllRestaurantOrders = async (req,res)=>{
    try{
        const restaurantId = req.params.restaurantId
        const orders = await Order.find({restaurant: restaurantId, status: { $ne: "cancelled" }})
        .populate("user", "name email phone")
        .populate("restaurant", "name location")
        .populate("cartId", "items totalPrice")
        .populate("coupon", "code discountPercentage maxDiscountValue") 
        if(!orders){
            return res.status(404).json({message: "No orders found for this profile"})
        }
        res.status(200).json({message: "Orders found successfully", orders})
    }catch(error){
        res.status(500).json({message: error.message})
    }
  }