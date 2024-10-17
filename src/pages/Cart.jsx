import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { emptycart, removeFromCart } from '../Redux/Slice/cartSlice';
import Header from '../components/Header';

function Cart() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cartReducer);
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if(cart.cart?.length>0){
      setTotal(cart.cart?.map(item=>item.totalPrice).reduce((p1,p2)=>p1+p2))
    }else{
      setTotal(0)
    }
  }, [cart])
  return (
    <>
    <Header insideHome={false}/>
    <div className='container' style={{ marginTop: "100px" }}>

      {
        cart.cart?.length > 0 ?
          <div className="row mt-5">
            <div className="col-lg-8">
              <table className='table shadow'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cart.cart.map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.title}</td>
                        <td><img style={{ width: "100%", height: "200px" }} src={item.thumbnail} alt="" /></td>
                        <td>${item.totalPrice}</td>
                        <td>{item.quantity}</td>
                        <td> <button className='btn' onClick={() => dispatch(removeFromCart(item.id))}><i className='fa-solid fa-trash text-danger'></i></button> </td>
                      </tr>
                    ))
                  }
                </tbody>

              </table>
              <div className="d-flex justify-content-between">
                <button className='btn btn-danger' onClick={() => dispatch(emptycart())}>Empty Cart</button>
                <Link to={'/'} style={{ textDecoration: "none" }} className='btn btn-success' onClick={() => handleCart(product)}> Shop-More</Link>
              </div>
            </div>
            <div className="col-lg-1">
            </div>
            <div className="col-lg-3">
              <div className="container border rounded shadow mt-5 p-5 w-100">
                <h1>Cart Summary</h1>
                <h4>Total Products:{cart.cart.length}</h4>
                <h5>Total: <span className='text-danger fw-bolder'> ${total}</span></h5>
              </div>

              <div className="d-grid">
                <button className='btn btn-success m-3 rounded'> Checkout</button>
              </div>
            </div>
          </div> : <div className='d-flex align-items-center'>
            <img src="https://krosfitsports.com/public/empty-cart.gif" alt="" />
            <h1 className='text-danger'>Your cart is empty</h1>
          </div>
      }

    </div>
    </>
  )
}

export default Cart