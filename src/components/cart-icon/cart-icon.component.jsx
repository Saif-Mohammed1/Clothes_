import { useDispatch, useSelector } from "react-redux";

import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selectors";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { CartIconContainer, ItemCount } from "./cart-icon.styles";
import { selectCurrentUser } from "../../store/user/user.selectors";

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);
  const currentUser = useSelector(selectCurrentUser);
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return currentUser ? (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  ) : (
    <CartIconContainer>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>0</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
