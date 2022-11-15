import { Fragment, useContext } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/card-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
// import { CartContext } from "../../contexts/cart.context";
// import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import {NavigationContainer, NavLink, NavLinks, LogoContainer} from "./navigation.styles";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {
  const currentUser = useSelector((selectCurrentUser));
  const isCartOpen = useSelector((selectIsCartOpen));
  // const { currentUser } = useContext(UserContext);
  // const {isCartOpen,setIsCartOpen} = useContext(CartContext)

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer   to="/">
          <CrwnLogo className="logo" ></CrwnLogo>
        </LogoContainer>
        <NavLinks>
          <NavLink onClick={()=>isCartOpen}  to="/shop">
            SHOP
          </NavLink >
          {currentUser ? (
            <NavLink as='span' onClick={()=>{signOutUser()}}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">
              SIGN IN
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {
          isCartOpen && <CartDropdown/>
        }
      </NavigationContainer>

      <Outlet />
    </Fragment>
  );
};
export default Navigation;
