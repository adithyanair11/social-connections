import './modal.css';
import { useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { selectUsers } from '../../store/users/users.selector';
import { addConnection } from '../../store/users/users.action';
import { Button } from '../custom-button/custom-button.component';
import {motion} from 'framer-motion';
import { Backdrop } from '../backdrop/backdrop';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { findConnections } from '../../utils/graph';
const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500
        }
    },
    exit: {
        y: "100vh",
        opacity: 0
    }
};

export const Modal = ({handleClose,user}) => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const [name,setName] = useState('');
    const [source,setSource] = useState('');
    const [target,setTarget] = useState('');
    const [result,setResult] = useState([]);
    const [error,setError] = useState('');

    const doesExist = (name) => {
        const findUser = users.find(user => user.name === name);
        return findUser;
    }
    const handleChange = (e) => {
        const {value} = e.target;
        setName(value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!doesExist(name)){
            Toastify({
                text: "user does not exist",
                duration: 3000,
                close: false,
                gravity: "top", 
                position: "center", 
                style: {
                    backgroundColor: "#3f0d12",
                    backgroundImage: "linear-gradient(315deg, #3f0d12 0%, #a71d31 74%)"
                },
              }).showToast();
        }else if(name === user.name){
            Toastify({
                text: "cannot connect to the same user",
                duration: 3000,
                close: false,
                gravity: "top", 
                position: "center", 
                style: {
                    backgroundColor: "#3f0d12",
                    backgroundImage: "linear-gradient(315deg, #3f0d12 0%, #a71d31 74%)"
                },
              }).showToast();
        }else{
            dispatch(addConnection(users,user,name));
            Toastify({
                text: "connected",
                duration: 3000,
                close: false,
                gravity: "top", 
                position: "center", 
                style: {
                    backgroundColor: "#74f2ce",
                    backgroundImage: "linear-gradient(315deg, #74f2ce 0%, #7cffcb 74%)"
                },
              }).showToast();
        }
        setName('');
    }

    const sourceChange = (e) => {
        const {value} = e.target;
        setSource(value);
    }
    const targetChange = (e) => {
        const {value} = e.target;
        setTarget(value);
    }
    const handleConnect = (e) => {
        e.preventDefault();
        if(!source || !target) return;
        if(!doesExist(source) || !doesExist(target)){
            Toastify({
                text: "user does not exist",
                duration: 3000,
                close: false,
                gravity: "top", 
                position: "center", 
                style: {
                    backgroundColor: "#3f0d12",
                    backgroundImage: "linear-gradient(315deg, #3f0d12 0%, #a71d31 74%)"
                },
              }).showToast();
        }
        setResult(findConnections(users,source,target))
        if(!result){
            setError("Could not find connections");
            return;
        }
        setSource('');
        setTarget('');
    }
    return(
        <Backdrop onClick={handleClose}>
            <motion.div
            onClick={(e) => e.stopPropagation()}
            className="modal"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            >
            {
                user ?
                (<>
                    <h1>{user.name}</h1>
                    <div className='input-box'>
                        <form onSubmit={handleSubmit} className="form">
                            <input
                            className='input'
                            type="text"
                            placeholder='enter user'
                            onChange={handleChange}
                            value={name || ''}
                            />
                        <Button>connect</Button>
                        </form>
                    </div>
                </>
                )
                :
                (<div className='input-container'>
                    <form className='form' onSubmit={handleConnect}>
                    <input
                        className='input'
                        type="text"
                        placeholder='enter user'
                        onChange={sourceChange}
                        value={source || ''}
                        />
                    <Button>find mutuals</Button>
                    <input
                        className='input'
                        type="text"
                        placeholder='enter user'
                        onChange={targetChange}
                        value={target || ''}
                        />
                    </form>
                </div>)
            }
                {error && <p>{error}</p>}
                {result && (
                    result.map(users => {
                        return <div className='connected-items'>
                        {
                            users.map(user => {
                                return <span key={user}>{user}</span>
                            })
                        }
                        </div>
                    })
                )}
                <Button buttonType="close" onClick={handleClose}>close</Button>
            </motion.div>
        </Backdrop>
    )
}