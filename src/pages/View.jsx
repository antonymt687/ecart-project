import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { addToWishList } from '../Redux/Slice/wishlistSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../Redux/Slice/cartSlice'
import Header from '../components/Header'

function View() {
  const dispatch = useDispatch()
  const  cart =useSelector((state) => state.cartReducer);

  const { id } = useParams()
  // console.log(id);
  const { loading } = useSelector((state) => state.productReducer)
  const [product, setProduct] = useState({})
  const { wishlist } = useSelector((state) => state.wishListReducer)



  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products"))
    setProduct(products?.find(item => item.id == id))
  }, [])


  // console.log(product);
  const handleWishlist = (product) => {
    const existingProduct = wishlist.find(item => item?.id == product.id)
    if (existingProduct) {
      alert("product already exist in wishlist")
    } else {
      dispatch(addToWishList(product))
    }
  }

  const handleCart = (product) => {
    const existingProduct = cart.cart?.find(item => item.id == product.id);
    if (existingProduct) {
      dispatch(addToCart(product))
      alert("Items added");
    } else {
      dispatch(addToCart(product))
      alert("Items added successfully");
    }
  };

  return (
    <>
    <Header insideHome={false} />
    <div className='container row' style={{ marginTop: "80px" }}>
      
      <div className="col-lg-4">
        <img style={{ width: "100%", height: "400px" }} src={product.thumbnail} alt="" />
      </div>
      <div className="col-lg-2">

      </div>
      <div className="col-lg-6">
        <p>Pid:019182</p>
        <h1>{product.title}</h1>
        <h5 className='fw-bolder'>Price: <span style={{ color: "red" }}>{product.price}$</span></h5>
        <p>{product.description}</p>
        <div className="d-flex justify-content-between mt-4">
          <Button className='btn btn-light' onClick={handleWishlist} ><i className='fa-solid fa-heart text-danger'></i></Button>
          <Button className='btn btn-light'  onClick={() => handleCart(product)}><i className='fa-solid fa-cart-shopping text-warning'></i></Button>
        </div>
      </div>

    </div>

    </>

    
  )
}

export default View