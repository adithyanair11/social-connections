import { useState } from 'react';
export const ConnectionForm = ({users}) => {
    const [name1,setName1] = useState('');
    const [name2,setName2] = useState('');
    const handleChange1 = (e) => {
        const {value} = e.target;
        setName1(value);
    }
    const handleChange2 = (e) => {
        const {value} = e.target;
        setName2(value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    console.log(users);
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder="enter the name"
                onChange={handleChange1}
                value={name1}
                />
                <input 
                type="text"
                placeholder="enter the name"
                onChange={handleChange2}
                value={name2}
                />
                <button>find</button>
            </form>
        </div>
    )
}