import { updateAuthTokenRedux } from '../../Store/Common';
import { signOut } from 'firebase/auth';  
import { auth } from '../../Components/firebase';
import { useDispatch } from 'react-redux';
import './confirmation.css';

interface Props{
  setLogout:(value:boolean)=>void;
}
const Confirmation=({setLogout}:Props)=>{
   const dispatch = useDispatch();
   console.log("confirmation");
    return (

        <div className="place-order-container">
      <div className="place-order">
        <h2> Are you sure ?</h2>
        
        <div className='confirm'> 
        <button
       onClick={()=> {signOut(auth);
        dispatch(updateAuthTokenRedux({ token: null }));}}
       className="place-order-btn"
     >
       YES
     </button>
     <button
    
       className="place-order-btn"
       onClick={()=>setLogout(false)}
  
     >
       No
     </button>
        </div>
        <br />
        
      </div>
    </div>
    )
}
export default Confirmation;