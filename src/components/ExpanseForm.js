import React from 'react'
import {MdSend} from 'react-icons/md'

function ExpanseForm({handelCharge, handelAmount, handelSubmit, charge, amount, edit}) {
  return (
    <form onSubmit={handelSubmit}>
        <div className='form-center'>
            <div className='form-group'>
                <label htmlFor='charge'>charge</label>
                <input type="text" className='form-control' id='charge' name='charge' placeholder='e.g. rent' value={charge} onChange={handelCharge}/>
            </div>
            <div className='form-group'>
                <label htmlFor='amount'>amount</label>
                <input type="number" className='form-control' id='amount' name='amount' placeholder='e.g. 1000d' value={amount} onChange={handelAmount}/>
            </div>
        </div>
        <button type='submit' className='btn'>
            {edit ? 'Edit' : 'Submit'}
            <MdSend className='btn-icon'/>
        </button>
    </form>
  )
}

export default ExpanseForm