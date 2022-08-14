import './App.css';
import {selectUsers} from './store/users/users.selector';
import { useSelector } from 'react-redux';
import { InputBox } from './components/input-box/input-box.component';
import {UserCard} from './components/user-card/user-card.component';
import {Button} from './components/custom-button/custom-button.component';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {Modal} from './components/modal/modal';
function App() {
  const users = useSelector(selectUsers);
  const [modalOpen, setModalOpen] = useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);
  return (
    <div className="App">
      <div className='header'>
        <InputBox />
        
        {
          users.length >= 2 ?
          (<Button buttonType="find" onClick={() => (modalOpen ? close() : open())} 
          >Find Connection</Button>)
          :
          null
        }
      </div>
      <>
        {
          users.length ?
          (<div className='users'>
          {
            users.map((user,idx) => <UserCard key={idx} user={user}/>)
          }
          </div>)
          :
          (<div className='heading'>
            <p className='slide-up'>Welcome! Start adding users and find their connections</p>
          </div>)
        }
      </>
      <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}>
            {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
