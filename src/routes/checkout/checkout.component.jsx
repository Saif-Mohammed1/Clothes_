import { useDispatch, useSelector } from "react-redux";

import {
  selectCartItems,
  selectCartTotal,
  selectIsCartOpen,
} from "../../store/cart/cart.selectors";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles";
import PaymentForm from "../../components/payment-from/payment-form.component";
import { selectCurrentUser } from "../../store/user/user.selectors";
import Authentication from "../authentication/authentication.component";
import { useNavigate } from "react-router-dom";
import { setIsCartOpen } from "../../store/cart/cart.action";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isCartOpen = useSelector(selectIsCartOpen);
  const renderSignIn = () => {
    navigate("/auth");

    // moved to main page (app)
    // if (!currentUser) {
    //   if (isCartOpen) {
    //     dispatch(setIsCartOpen(!isCartOpen));
    //   }
    // }
    return <Authentication />;
  };

  return (
    <>
      {/* {currentUser ? ( */}
      <CheckoutContainer>
        <CheckoutHeader>
          <HeaderBlock>
            <span>Product</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Description</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Quantity</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Price</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Remove</span>
          </HeaderBlock>
        </CheckoutHeader>
        {cartItems.map((cartItem) => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))}
        <Total>Total: ${cartTotal}</Total>
        <PaymentForm />
      </CheckoutContainer>
      {/* ) : (
        renderSignIn()
      )} */}
    </>
  );
};

export default Checkout;
