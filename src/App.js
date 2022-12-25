import React , {useState, useEffect} from 'react'
import './App.css'
import ExpanseList from './components/ExpanseList.js'
import ExpanseForm from './components/ExpanseForm.js'
import Alert from './components/Alert.js'
import { v4 as uuidv4 } from 'uuid';
import { type } from '@testing-library/user-event/dist/type'

const initialExpanses = localStorage.getItem("expanses") ? JSON.parse(localStorage.getItem("expanses")) : [];


function App() {

  const [expanses, setExpanses] = useState(initialExpanses);

  const [charge , setCharge] = useState('');

  const [amount, setAmount] = useState('');

  const [alert, setAlert] = useState({show:false});

  const [edit , setEdit] = useState(false);

  const [id , setId] = useState(0);

  useEffect(() =>{
    localStorage.setItem("expanses", JSON.stringify(expanses));
  })

  const handelCharge = e =>{
    setCharge(e.target.value);
  }

  const handelAmount = e =>{
    setAmount(e.target.value);
  }

  const handelAlert = ({type,text}) =>{
    setAlert({show:true, type, text});
    setTimeout(() => {
      setAlert({show: false})
    }, 2000);
  }

  const handelSubmit = e =>{
    e.preventDefault();
  
    if(charge !=='' && amount > 0){
      if(edit){
        let tempArr = expanses.map(item => {
          return item.id === id ? {...item,charge,amount} :item
        });
        tempArr.charge = charge;
        tempArr.amount = amount;
        setExpanses(tempArr);
        setEdit(false);
        setAlert({type:'success', text:'Expense has been successfully edited'})
      }else{
        const singleExpanse = {
          id: uuidv4(),
          charge,
          amount
        };
        setExpanses([...expanses, singleExpanse]);
        handelAlert({type:'success', text:'You have seccessfully added your expense to the list'})
      }
      setAmount('');
      setCharge('');
    }else{
      handelAlert({type:'danger' , text:'the charge and amount fild cannot be empty'})
    }
  }

  const clearItems = () =>{
    setExpanses([]);
    handelAlert({type:'danger', text:'all items are deleted'})
  }

  const handelDelete = (id) =>{
    let tempExpanses = expanses.filter(items =>items.id !== id);
    setExpanses(tempExpanses);
    handelAlert({type:'danger', text:'item deleted'})
  }

  const handelEdit = (id) =>{
    let expanse = expanses.find(item => item.id === id);
    console.log(expanse);
    let {charge, amount} = expanse;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }

  return (
    <>
      {alert.show && <Alert type={alert.type}  text={alert.text}/>}
      <Alert/>
      <h1>Budget calculator</h1>
      <main className="App">
        <ExpanseForm handelCharge={handelCharge} handelAmount={handelAmount} handelSubmit={handelSubmit} charge={charge} amount={amount} edit={edit}/>
        <ExpanseList expanses = {expanses} clearItems={clearItems} handelDelete={handelDelete} handelEdit={handelEdit}/>
      </main>
      <h1>Total spendings :{' '} <span className='total'>
          ${expanses.reduce((acc, curr) =>{
            return acc += parseInt(curr.amount)
          },0)}
        </span>
      </h1>
    </>
  );
}

export default App;
