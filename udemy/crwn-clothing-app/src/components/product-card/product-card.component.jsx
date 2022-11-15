import './product-card.styles.scss';
import Button from '../button/button.component';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

// import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart.context';



const ProductCard = ({ product }) => {
    const { name, price, imageUrl }= product;
    const cartItems = useSelector(selectCartItems)
    // const {addItemToCart} = useContext(CartContext)
    const dispatch = useDispatch();
    const addProductToCart = ()=> dispatch(addItemToCart(cartItems, product))
    return(

        <div className="product-card-container">
        <img src={imageUrl} alt={`${name}`} />
        <div className="footer">
            <span className='name'>{name}</span>
            <span className='orice'>{price}</span>
        </div>
        <Button onClick={addProductToCart} buttonType='inverted'>Add to card</Button>
    </div>
        )

}

export default ProductCard;