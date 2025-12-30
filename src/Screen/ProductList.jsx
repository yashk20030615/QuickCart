import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Network/fetchProducts";
import ProductCard from "../Components/CartItem";
import Loader from "../Components/Loader";
import { AddProds } from "../redux/ProductSlice";

const ProductList = () => {
  const dispatch = useDispatch();


  const storedProds = useSelector(
    state => state.ProductReducer.storedProds
  );

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const API = async (newSkip) => {
    try {
      setLoading(true);
      const products = await fetchProducts(newSkip);

      setProductList(prev => [...prev, ...products]);
      dispatch(AddProds(products));
    } catch (err) {
      console.log("error in fetching data", err);
    } finally {
      setLoading(false);
      setIsFirstLoad(false);
    }
  };

  // ✅ First load
  useEffect(() => {
    if (storedProds.length > 0) {
      setProductList(storedProds);
      setIsFirstLoad(false);
    } else {
      API(0);
    }
  }, []);

  // ✅ Keep local state in sync with Redux
  useEffect(() => {
    if (storedProds.length > 0) {
      setProductList(storedProds);
    }
  }, [storedProds]);

  // ✅ Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (
        scrollTop + clientHeight >= scrollHeight - 5 &&
        !loading
      ) {
        setSkip(prev => {
          const newSkip = prev + 10;
          API(newSkip);
          return newSkip;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <Container className="mt-4">
      <Row>
        {isFirstLoad && loading ? (
          <Loader loading={loading} position="center" />
        ) : (
          productList.map(product => (
            <Col md={4} key={product.id} className="mb-4">
              <ProductCard productData={product} />
            </Col>
          ))
        )}
      </Row>

      {loading && !isFirstLoad && (
        <Loader loading={loading} position="bottom" />
      )}
    </Container>
  );
};

export default ProductList;
