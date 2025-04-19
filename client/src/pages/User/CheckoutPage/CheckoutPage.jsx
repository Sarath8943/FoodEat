import React, { useState, useEffect } from "react";
import AddressSection from "./AddressSection";
import CouponSection from "./CouponSection";
import PriceDetails from "./PriceDetails";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/UseFetch";

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [savedAddresses, isLoading, error] = useFetch("/address/addresses");
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [discount, setDiscount] = useState(0);

  // Handle missing cart state
  const cart = location.state?.cart;
  const [finalPrice, setFinalPrice] = useState(cart?.totalPrice || 0);

  // Redirect if no cart data
  useEffect(() => {
    if (!cart) {
      navigate("/cart", { replace: true });
    }
  }, [cart, navigate]);

  const handleDiscountApplied = (discount, finalPrice) => {
    setDiscount(discount);
    setFinalPrice(finalPrice);
  };

  if (!cart) {
    return null; // or you could return a message like "Redirecting to cart..."
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-lg">
          Error loading addresses: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-screen bg-gray-50 p-6">
      {/* Address Section */}
      <div className="col-span-2 bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
        <AddressSection
          address={address}
          setAddress={setAddress}
          savedAddresses={savedAddresses}
          setSelectedAddressId={setSelectedAddressId}
          selectedAddressId={selectedAddressId}
        />
      </div>

      {/* Coupon and Price Section */}
      <div className="space-y-6">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Apply Coupon</h2>
          <CouponSection
            orderValue={cart.totalPrice}
            onDiscountApplied={handleDiscountApplied}
            selectedCoupon={selectedCoupon}
            setSelectedCoupon={setSelectedCoupon}
          />
        </div>

        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Price Details</h2>
          <PriceDetails
            cart={cart}
            discount={discount}
            finalPrice={finalPrice}
            selectedCoupon={selectedCoupon}
            selectedAddressId={selectedAddressId}
            setSelectedCoupon={setSelectedCoupon}
            setSelectedAddressId={setSelectedAddressId}
            address={address}
          />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
