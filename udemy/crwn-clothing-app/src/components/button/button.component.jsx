/*
default

inverted

google sign in
*/ 
import "./button.styles.scss"
export const BUTTON_TYPE_CLASSES={
    google:'google-sign-in',
    inverted:'inverted',
}

const Button = ({children, buttonType, isLoading, ...otherProps})=>{
    return(
        <button disabled={isLoading} {...otherProps} className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
            {children}
        </button>
    )
}
export default Button