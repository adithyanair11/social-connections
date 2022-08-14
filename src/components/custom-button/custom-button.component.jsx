import './custom-button.styles.css';
import {motion} from 'framer-motion'
export const BUTTON_TYPES_CLASSES = {
    add: 'add',
    find: 'find',
    close: 'close'
}

export const Button = ({children,buttonType, ...otherProps}) => {
    return(
        <motion.button 
        className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`}
        {...otherProps}
        whileHover={{scale:1.04}}
        whileTap={{scale:0.9}}>
            {children}
        </motion.button>
    );
}