import axios from "axios";
import { useEffect, useReducer } from "react";
import Row from 'react-bootstrap/Row'
import { useNavigate, useParams } from "react-router-dom";
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Rating from "../components/Rating";
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import LoadinBox from "../components/LoadinBox.jsx";
import MessageBox from "../components/MessageBox.jsx";
import { getError } from "../utils";
import { useContext } from "react";
import { Store } from "../Store";

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FECTH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state;
  }
}


function ProductScreen() {
  const params = useParams()
  const navigate = useNavigate()
  const { slug } = params

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  })


  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FECTH_SUCCESS', payload: result.data })
      } catch (err) {

        dispatch({ type: 'FETCH_FAIL', payload: getError(err)})
      }

      /* setProducts(result.data) */
    }
    fetchData()
  }, [slug]);

  const {state, dispatch: ctxDispatch} = useContext(Store)
  const { cart } = state;
  const addToCartHandler = async()=>{
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1: 1;

    const { data } = await axios.get(`/api/products/${product._id}`);

    if(data.countInStock < quantity){
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type:'CART_ADD_ITEM',
     payload: {...product, quantity},
  })
    navigate('/cart')
  }

  return (
    loading ? (

      <LoadinBox />
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) :

      <div>
        <Row>
          <Col md={6}>
            <img className="img-large" src={product.image} alt={product.name}>

            </img>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Helmet>
                  <title>
                    {product.name}
                  </title>
                </Helmet>
                <h1> {product.name} </h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating rating={product.rating}
                  numReviews={product.numReviews}>

                </Rating>
              </ListGroup.Item>
              <ListGroup.Item>
                Price : ${product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                Description : {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>

                        {product.countInStock > 0 ? (
                          <Badge bg="success">In Stock</Badge>
                        ) : (
                          <Badge bg="danger">Unavailable</Badge>
                        )}</Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button onClick={addToCartHandler} variant="warning">
                          Add to Cart
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}



                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </div>
  );
}

export default ProductScreen