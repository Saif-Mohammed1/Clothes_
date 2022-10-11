import { useDispatch, useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selectors";
import { selectCurrentUser } from "../../store/user/user.selectors";
import { addItemToCart } from "../../store/cart/cart.action";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  ProductCartContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectCurrentUser);

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  const signUpFirst = () =>
    alert(" Hello Sir Sign In first To Add Product To Card");

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      {currentUser ? (
        <Button
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          onClick={addProductToCart}
        >
          Add to card
        </Button>
      ) : (
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={signUpFirst}>
          Add to card
        </Button>
      )}
    </ProductCartContainer>
  );
};

export default ProductCard;
