import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/card-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import {NavigationContainer, NavLink, NavLinks, LogoContainer} from "./navigation.styles";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const {isCartOpen,setIsCartOpen} = useContext(CartContext)

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer   to="/">
          <CrwnLogo className="logo" onClick={()=>setIsCartOpen(false)}></CrwnLogo>
        </LogoContainer>
        <NavLinks>
          <NavLink onClick={()=>setIsCartOpen(false)}  to="/shop">
            SHOP
          </NavLink >
          {currentUser ? (
            <NavLink as='span' onClick={()=>{signOutUser(); setIsCartOpen(false)}}>
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
