import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { searchProduct } from '../Redux/Slice/productSlice';

function Header({ insideHome }) {
  const dispatch = useDispatch();
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const { wishlist } = useSelector((state) => state.wishListReducer);
  const { cart } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    setWishlistCount(wishlist?.length || 0); // Use optional chaining and fallback to 0
    setCartCount(cart?.length || 0); // Use optional chaining and fallback to 0
  }, [wishlist, cart]);

  return (
    <div>
      <Navbar expand="lg" className="bg-info">
        <Container>
          <Navbar.Brand>
            <Link to={'/'} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
              <i className='fa-solid fa-truck-fast fa-bounce'></i> E-CART
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {insideHome && (
                <Nav.Link className="btn btn-outline-light">
                  <input
                    type="text"
                    className="form-control"
                    style={{ width: '500px', maxWidth: '100%' }}
                    placeholder="Search products"
                    onChange={(e) => dispatch(searchProduct(e.target.value.toLowerCase()))}
                  />
                </Nav.Link>
              )}

              <Nav.Link className="btn btn-outline-light">
                <Link to={'/wishlist'} style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none' }}>
                  <i className="fa-solid fa-heart text-danger"></i> Wishlist{' '}
                  <Badge bg="success" className="rounded ms-2">{wishlistCount}</Badge>
                </Link>
              </Nav.Link>
              <Nav.Link className="btn btn-outline-light">
                <Link to={'/cart'} style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none' }}>
                  <i className="fa-solid fa-cart-shopping text-warning"></i> Cart
                  <Badge bg="success" className="rounded ms-2">{cartCount}</Badge>
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
