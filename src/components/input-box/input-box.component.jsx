import './input-box.styles.css';
import {useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {addUser} from '../../store/users/users.action';
import {selectUsers} from '../../store/users/users.selector';
import { Button } from '../custom-button/custom-button.component';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
export const InputBox = () => {
    const defaultFormFields = {
        name: '',
        friends: []
      }
      const dispatch = useDispatch();
      const users = useSelector(selectUsers);
      const [user,setUser] = useState(defaultFormFields);
      const {name} = user;
      const resetFormField = () => {
        setUser(defaultFormFields);
      }
    
      const handleChange = (e) => {
        const {value} = e.target;
        setUser({...user,name:value}); 
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if(name === '') return;
        const findUser = users.find(user => user.name === name);
        if(findUser){
          Toastify({
            text: "user already exists",
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
          dispatch(addUser(users,user));
        }
        resetFormField();
      }
    return(
        <div className='input-box'>
            <form onSubmit={handleSubmit} className="form">
                <input
                className='input'
                type="text"
                placeholder='enter user'
                onChange={handleChange}
                value={name || ''}
                />
                <Button buttonType="add">add a user</Button>
            </form>
        </div>
    )
}