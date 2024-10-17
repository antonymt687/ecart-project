import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromWishlist } from '../Redux/Slice/wishlistSlice'
import Header from '../components/Header'
import { addToCart } from '../Redux/Slice/cartSlice'

function Wishlist() {
  const { wishlist } = useSelector((state) => state.wishListReducer)
  const cart = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch()

  const handleCart = (product) => {
    dispatch(addToCart(product))
    dispatch(removeFromWishlist(product.id))
  }
  return (
    <>
    <Header insideHome={false} />
    <div>
      <Row className='mt-5 container'>

        {
          wishlist?.length > 0 ? wishlist.map(product => (
            <Col className='mb-3 mt-3' sm={12} md={8} lg={4} xl={3} >
              <Card style={{ width: '18rem' }}>
                <Link to={`/view/${product.id}`}>
                  <Card.Img variant="top" style={{ width: "100%" }}
                    src={product.thumbnail} />
                </Link>

                <Card.Body className='bg-success'>
                  <Card.Title style={{ color: "black" }} className='text-center'>{product.title.slice(0, 10)}</Card.Title>
                  <div className="d-flex justify-content-between">
                    <Button className='btn btn-light' onClick={() => dispatch(removeFromWishlist(product.id))} ><i className='fa-solid fa-trash text-danger'></i></Button>
                    <Button className='btn btn-light' onClick={() => handleCart(product)}><i className='fa-solid fa-cart-shopping text-warning'></i></Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )) : <div className='d-flex align-items-center'>
            <img src="https://krosfitsports.com/public/empty-cart.gif" alt="" />
            <h1 className='text-danger'>Your Wishlist is empty</h1>
          </div>
        }


      </Row>
    </div>
    </>
  )
}

export default Wishlist