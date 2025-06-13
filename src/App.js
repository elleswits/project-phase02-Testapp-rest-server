import './App.css';
import React, { useState, useEffect } from 'react';
//import customers from './memdb.js'// 

import {CustomerList} from './components/CustomerList.js';
import {CustomerAddUpdateForm} from './components/CustomerAddUpdateForm.js';
import { getAll, post, put, deleteById } from './restdb.js'


function log(message){console.log(message);}

export function App(params) {
  
let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" };
const [customers, setCustomers] = useState([]);
const [formObject, setFormObject] = useState(blankCustomer);
let mode = (formObject.id >= 0) ? 'Update' : 'Add';
useEffect(() => { getCustomers() }, [formObject]);

  

const getCustomers = function () {
 log("in getCustomers()");
 getAll(setCustomers);
}


const handleListClick = function(item){
 log("in handleListClick()");
getAll(setFormObject)
  }  

  const handleInputChange = function (event) {
    log("in handleInputChange()");
 const name = event.target.name;
 const value = event.target.value;
 let newFormObject = {...formObject}
 newFormObject[name] = value;
 setFormObject(newFormObject);
  }

  let onCancelClick = function () {
    log("in onCancelClick()");
    setFormObject(blankCustomer);

  }

let onDeleteClick = function () {
 let postopCallback = () => { setFormObject(blankCustomer); }
 if (formObject.id >= 0) {
 deleteById(formObject.id, postopCallback);
 } else {
 setFormObject(blankCustomer);
 }
}


let onSaveClick = function () {
 let postopCallback = () => { setFormObject(blankCustomer); }
 if (mode === 'Add') {
 post(formObject, postopCallback);
 }
 if (mode === 'Update') {
 put(formObject, postopCallback);
 }
}


  let pvars = {
 mode: mode,
 handleInputChange: handleInputChange,
 formObject: formObject,
 onDeleteClick: onDeleteClick,
 onSaveClick: onSaveClick,
 onCancelClick: onCancelClick
 }

  return (
 <div>
 <CustomerList
 customers={customers}
 formObject={formObject}
 handleListClick={handleListClick}
 />
 <CustomerAddUpdateForm {...pvars}/>
 </div>
  );
}


export default App;
