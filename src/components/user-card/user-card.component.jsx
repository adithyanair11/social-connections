import './user-card.styles.css';
import { AnimatePresence} from 'framer-motion';
import { useState } from 'react';
import {Modal} from '../modal/modal'
import { useSelector,useDispatch } from 'react-redux';
import { removeUser} from '../../store/users/users.action';
import { selectUsers } from '../../store/users/users.selector';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
export const UserCard = ({user}) => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const [modalOpen, setModalOpen] = useState(false);
    const close = () => setModalOpen(false);
    const open = () => setModalOpen(true);

    const removeHandler = () => {
        dispatch(removeUser(users,user));
    }
    return(
        <div 
        className="card"
        >
            <h2>{user.name}</h2>
            <div className='card-item' onClick={() => (modalOpen ? close() : open())}>
                <span className='connection'
                >Add A Connection</span>
                <AddIcon />
            </div>
            <div className='card-item' onClick={removeHandler}>
                <span className='remove'>Remove User</span>
                <RemoveIcon />
            </div>

            <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}>
                {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} user={user}/>}
            </AnimatePresence>
        </div>
    )
}