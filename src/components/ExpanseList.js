import React from 'react'
import Item from './ExpanseItem'
import {MdDelete} from 'react-icons/md'

function ExpanseList({expanses, handelDelete, handelEdit , clearItems }) {
  return (
    <>
      <ul className='list'>
        {expanses.map((expanse)=>{
            return <Item key={expanse.id}  expanse={expanse} handelDelete={handelDelete} handelEdit={handelEdit}/>
        })}
      </ul>
      {expanses.length > 0 && <button className='btn' onClick={clearItems}>Clear expenses <MdDelete className='btn-icon'/></button>}  
    </>
  )
}

export default ExpanseList