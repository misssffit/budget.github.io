import React from 'react'
import {MdDelete, MdEdit} from 'react-icons/md'
function ExpanseItem({expanse, handelEdit, handelDelete}) {
  const {id, charge, amount} = expanse;
  return (
    <li className='item'>
        <div className='info'>
            <span className='expense'>{charge}</span>
            <span className='amounnt'>${amount}</span>
        </div>
        <div>
            <button className='edit-btn' aria-label='edit button' onClick={() => handelEdit(id)}>
                <MdEdit/>
            </button>
            <button className='clear-btn' aria-label='delete button' onClick={() => handelDelete(id)}>
                <MdDelete/>
            </button>
        </div>
    </li>
  )
}

export default ExpanseItem