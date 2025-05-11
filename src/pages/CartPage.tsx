
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2, CreditCard, Check } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useApp();
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Add some items to your cart before checking out.",
        variant: "destructive"
      });
      return;
    }
    
    setIsPaymentProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsPaymentProcessing(false);
      setPaymentComplete(true);
      clearCart();
      
      toast({
        title: "Payment Successful",
        description: "Your booking has been confirmed!",
      });
    }, 2000);
  };
  
  if (paymentComplete) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Payment Complete!</h1>
        <p className="text-gray-600 mb-8">Your booking has been confirmed.</p>
        <Button onClick={() => {
          setPaymentComplete(false);
          navigate('/');
        }}>
          Return to Home
        </Button>
      </div>
    );
  }
  
  return (
    <div className={`container mx-auto px-4 py-6 ${isMobile ? 'pb-24' : ''}`}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Your Booking Cart</h1>
        <p className="text-gray-600">Review your selections before checkout</p>
      </div>
      
      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map(item => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="h-32 sm:w-32 sm:h-auto overflow-hidden">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      
                      <div className="p-4 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-lg mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.details}</p>
                            <p className="font-bold text-algeria-blue mt-2">${item.price}</p>
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              className="mt-4 text-red-500 border-red-200 hover:bg-red-50"
              onClick={clearCart}
            >
              <Trash2 size={16} className="mr-2" />
              Clear Cart
            </Button>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                
                <div className="space-y-2 text-sm">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>${item.price}</span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
                
                <Button 
                  className="w-full mt-6 bg-algeria-blue hover:bg-algeria-blue/90"
                  onClick={handleCheckout}
                  disabled={isPaymentProcessing}
                >
                  {isPaymentProcessing ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <CreditCard size={18} className="mr-2" />
                      Checkout
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-6">
            <ShoppingCart className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="font-medium text-lg mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Add some flights, activities or attractions to get started</p>
          <Button 
            onClick={() => navigate('/explore')}
            className="bg-algeria-blue hover:bg-algeria-blue/90"
          >
            Explore Algeria
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
