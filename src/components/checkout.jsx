import React, { useState } from 'react';
import axios from 'axios';

const Checkout = ({ img, price, downloadUrl, onClose, onCreateError, onCreateSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    amount: price, // Convert to the lowest currency unit
    currency: 'GH',
    callbackUrl: 'http://localhost:5173',
    imageUrl: img,
    downloadUrl: downloadUrl,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

  const handlePayment = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      setError(null);
  
      const response = await axios.post('https://localhost:7074/api/paystack/initialize', formData);
      console.log(response.data.transactionUrl);
  
      if (onCreateSuccess) {
        onCreateSuccess(response.data);
      }
  
      // Assuming you have a payment reference from the response
      const paymentReference = response.data.reference;
      console.log(paymentReference);
      
      // Open a new window for payment
      const paymentWindow = window.open(response.data.transactionUrl, '_blank');
      // Close the modal after successful payment initiation and verification
      
      // Introduce a delay of 5 seconds before initiating verification
      setTimeout(async () => {
        await handleVerifyTransaction(paymentReference);
      }, 10000);
      
      // Check if the payment window is closed
      const checkWindowClosed = setInterval(() => {
        if (paymentWindow && paymentWindow.closed) {
          clearInterval(checkWindowClosed);
        }
      }, 1000); // Check every second
  
    } catch (error) {
      console.error('Error initializing payment:', error);
  
      setError('Error initializing payment. Please try again.');
  
      if (onCreateError) {
        onCreateError(error);
      }
    } finally {
      setLoading(false);
    }
  };
  

  const handleVerifyTransaction = async (reference) => {
    try {
      setLoading(true);
      setError(null);
  
      // Call the VerifyTransaction method in PaystackService
      const response = await axios.post('https://localhost:7074/api/paystack/verify', { reference });
      console.log('Verification response:', response.data);
  
      // Check if the payment verification is successful
      if (response.data.status == "success" ) {
        // You can perform additional actions upon successful verification here
        if (onCreateSuccess) {
          onCreateSuccess(response.data);
        }
        
        setTimeout(async () => {
          await handleOrder(formData);
          window.open(downloadUrl);
        }, 10000);
      } else {
        // Handle unsuccessful verification, e.g., display an error message
        setError('Payment verification failed. Please contact support.');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
  
      setError('Error verifying payment. Please try again.');
  
      if (onCreateError) {
        onCreateError(error);
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleOrder = async (formData) => {
    try {
      setLoading(true);
      setError(null);

      const OrderValue = {
        Customer: formData.customer,
        PictureOrdered: formData.downloadUrl,
        OrderDate: new Date().toISOString(), // You mentioned an empty string here
      };
      console.log('OrderValue:', OrderValue);
      const response = await axios.post('https://localhost:7074/api/Order', OrderValue);
      console.log(response);
  
      if (onCreateSuccess) {
        onCreateSuccess(response.data);
      }
  
    } catch (error) {
      console.error('Error initializing payment:', error);
  
      setError('Error initializing payment. Please try again.');
  
      if (onCreateError) {
        onCreateError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white w-96 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
        <form className="p-4">
          <div className="mb-4 hidden">
            <input
              type="hidden"
              name="customer"
              value={formData.orderId}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="customer"
              placeholder="Name"
              value={formData.customer}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="amount"
              placeholder="Amount"
              value={Number(formData.amount).toFixed(2)}
              onChange={handleChange}
              disabled
              className="p-2 border border-gray-300 rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="currency"
              placeholder="Currency"
              value={formData.currency}
              onChange={handleChange}
              disabled
              className="p-2 border border-gray-300 rounded-lg w-full"
            />
          </div>
          {/* Hidden fields */}
          <input type="hidden" name="reference" value={formData.reference} />
          <input type="hidden" name="callbackUrl" value={formData.callbackUrl} />
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            onClick={handlePayment}
            className="bg-green-500 text-white p-2 rounded-lg w-full"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Checkout'}
          </button>
          <button
            onClick={onClose}
            className="mt-2 bg-red-500 text-white p-2 rounded-lg w-full"
            disabled={loading}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

const generateReference = () => {
  return `REF-${Date.now()}`;
};

export default Checkout;
