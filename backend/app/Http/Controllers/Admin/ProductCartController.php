<?php

namespace App\Http\Controllers\Admin;

use App\Models\CartOrder;
use App\Models\ProductCart;
use App\Models\ProductList;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductCartController extends Controller
{
    public function addToCart(Request $request){
        $email = $request->input('email');
        $size = $request->input('size');
        $color = $request->input('color');
        $quantity = (int)$request->input('quantity'); // Cast to integer
        $product_code = $request->input('product_code');
    
        $productDetails = ProductList::where('product_code', $product_code)->get();
    
        $price = $productDetails[0]['price'];
        $special_price = $productDetails[0]['special_price'];
    
        if($special_price == "na") {
            $unit_price = (float)$price; // Cast to float
        } else {
            $unit_price = (float)$special_price; // Cast to float
        }
    
        $total_price = $unit_price * $quantity;
    
        $result = ProductCart::insert([
            'email' => $email,
            'image' => $productDetails[0]['image'],
            'product_name' => $productDetails[0]['title'],
            'product_code' => $productDetails[0]['product_code'],
            'size' => "Size: " . $size,
            'color' => "Color: " . $color,
            'quantity' => $quantity,
            'unit_price' => $unit_price,
            'total_price' => $total_price, 
        ]);
    
        return $result;
    }
    


    public function CartCount(Request $request){
        $product_code = $request->product_code;
        $result = ProductCart::count();
        return $result;
    } 


    public function CartList(Request $request){

        $email = $request->email;
        $result = ProductCart::where('email',$email)->get();
        return $result;

    } 


    public function RemoveCartList(Request $request){

        $id = $request->id;
        $result = ProductCart::where('id',$id)->delete();
        return $result;

    }


    public function CartItemPlus(Request $request){
         $id = $request->id;
         $quantity = $request->quantity;
         $price = $request->price;
         $newQuantity = $quantity+1;
         $total_price = $newQuantity*$price;
         $result = ProductCart::where('id',$id)->update(['quantity' =>$newQuantity, 'total_price' => $total_price ]);

         return $result;

    }

        public function CartItemMinus(Request $request){
         $id = $request->id;
         $quantity = $request->quantity;
         $price = $request->price;
         $newQuantity = $quantity-1;
         $total_price = $newQuantity*$price;
         $result = ProductCart::where('id',$id)->update(['quantity' =>$newQuantity, 'total_price' => $total_price ]);

         return $result;

    }



    public function CartOrder(Request $request)
    {
        $city = $request->input('city');
        $paymentMethod = $request->input('payment_method');
        $yourName = $request->input('name');
        $email = $request->input('email');
        $DeliveryAddress = $request->input('delivery_address');
        $invoice_no = $request->input('invoice_no');
        $DeliveryCharge = $request->input('delivery_charge');
    
        date_default_timezone_set("Asia/Hebron");
        $request_time = date("h:i:sa");
        $request_date = date("d-m-Y");
    
        $CartList = ProductCart::where('email', $email)->get();
    
        foreach ($CartList as $CartListItem) {
            $cartInsertDeleteResult = "";
    
            $resultInsert = CartOrder::insert([
                'invoice_no' => "Easy" . $invoice_no,
                'product_name' => $CartListItem['product_name'],
                'product_code' => $CartListItem['product_code'],
                'size' => $CartListItem['size'],
                'color' => $CartListItem['color'],
                'quantity' => $CartListItem['quantity'],
                'unit_price' => $CartListItem['unit_price'],
                'total_price' => $CartListItem['total_price'],
                'email' => $CartListItem['email'],
                'name' => $yourName,
                'payment_method' => $paymentMethod,
                'delivery_address' => $DeliveryAddress,
                'city' => $city,
                'delivery_charge' => $DeliveryCharge,
                'order_date' => $request_date,
                'order_time' => $request_time,
                'order_status' => "Pending",
            ]);
    
            if ($resultInsert == 1) {
                $resultDelete = ProductCart::where('id', $CartListItem['id'])->delete();
                if ($resultDelete == 1) {
                    $cartInsertDeleteResult = 1;
                } else {
                    $cartInsertDeleteResult = 0;
                }
            }
    
            // Create notification
            $this->createNotification(
                $CartListItem['email'],
                'Order Pending',
                "Your order with invoice no Easy{$invoice_no} is placed and pending."
            );
        }
        return $cartInsertDeleteResult;
    }
    



    public function OrderListByUser(Request $request){
        $email = $request->email;
        $result = CartOrder::where('email',$email)->orderBy('id','DESC')->get();
        return $result;

    }


    ///////////////// Order Process From Backend ////////////////


    public function PendingOrder(){

        $orders = CartOrder::where('order_status','Pending')->orderBy('id','DESC')->get();
        return view('backend.orders.pending_orders',compact('orders'));

    } 


        public function ProcessingOrder(){

        $orders = CartOrder::where('order_status','Processing')->orderBy('id','DESC')->get();
        return view('backend.orders.processing_orders',compact('orders'));

    } 


        public function CompleteOrder(){

        $orders = CartOrder::where('order_status','Complete')->orderBy('id','DESC')->get();
        return view('backend.orders.complete_orders',compact('orders'));

    } 


    public function OrderDetails($id){

        $order = CartOrder::findOrFail($id);
        return view('backend.orders.order_details',compact('order'));


    } 

 
    // public function PendingToProcessing($id){

    // CartOrder::findOrFail($id)->update(['order_status' => 'Processing']);

    //  $notification = array(
    //         'message' => 'Order Processing Successfully',
    //         'alert-type' => 'success'
    //     );

    //     return redirect()->route('pending.order')->with($notification);

    // } 

 public function PendingToProcessing($id)
    {
        $order = CartOrder::findOrFail($id);
        $order->update(['order_status' => 'Processing']);

        // Create notification
        $this->createNotification(
            $order->email,
            'Order Processing',
            "Your order with invoice no {$order->invoice_no} is now being processed."
        );

        $notification = array(
            'message' => 'Order Processing Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('pending.order')->with($notification);
    }

    //     public function ProcessingToComplete($id){

    // CartOrder::findOrFail($id)->update(['order_status' => 'Complete']);

    //  $notification = array(
    //         'message' => 'Order Complete Successfully',
    //         'alert-type' => 'success'
    //     );

    //     return redirect()->route('processing.order')->with($notification);

    // } 

     public function ProcessingToComplete($id)
    {
        $order = CartOrder::findOrFail($id);
        $order->update(['order_status' => 'Complete']);

        // Create notification
        $this->createNotification(
            $order->email,
            'Order Complete',
            "Your order with invoice no {$order->invoice_no} is complete and ready for delivery."
        );

        $notification = array(
            'message' => 'Order Complete Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('processing.order')->with($notification);
    }

    private function createNotification($email, $title, $message)
    {
        Notification::create([
            'email' => $email,
            'title' => $title,
            'message' => $message,
            'date' => now(),
        ]);
    }

}
 