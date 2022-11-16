// import { useContext } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectCartItems } from "../../store/cart/cart.selector"
// import { CartContext } from "../../contexts/cart.context"
import Button from "../button/button.component"
import CartItem from "../cart-item/cart-item.component"
import "./cart-dropdown.styles.scss"


const CartDropdown = () => {
    // const { cartItems,setIsCartOpen} = useContext(CartContext)
    const cartItems = useSelector(selectCartItems)
    const navigate = useNavigate();

    const goToCheckoutHandler = () =>{
        navigate('/checkout')
    }
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map(item =><CartItem cartItem={item} key={item.id}></CartItem>)}
            </div>
            <Button onClick={()=>goToCheckoutHandler()} > Go to checkout</Button>
        </div>
    )
}

export default CartDropdown;