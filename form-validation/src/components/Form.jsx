import { useRef, useState } from 'react';  

export default function Form() {  
  const [errors, setErrors] = useState([]);  
  const [isFormSent, setIsFormSent] = useState(false);  

  const name = useRef();  
  const city = useRef();  
  const message = useRef();  
  const acceptConditions = useRef();  
  const mail = useRef();  

  const resetForm = () => {  
    name.current.value = '';  
    mail.current.value = '';  
    city.current.value = '';  
    message.current.value = '';  
    acceptConditions.current.checked = false;  
  };  

  const handleFormValidation = () => {  
    // Reset errors at the start of validation  
    setErrors([]);  
    let newErrors = [];  
    const nameValue = name.current.value;  
    const mailValue = mail.current.value;  
    const cityValue = city.current.value;  
    const messageValue = message.current.value;  
    const acceptConditionValue = acceptConditions.current.checked;  

    if (nameValue.trim() === '') {  
      name.current.style.border = '2px solid red';
      newErrors.push('Name field is required');  
    } else {  
      name.current.style.border = ''; 
    }  

    if(!mailValue.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {  
      mail.current.style.border = '2px solid red'; 
      newErrors.push('Email field is not valide');  
    } else {  
      mail.current.style.border = '';  
    } 

    if (cityValue.trim() === '') {  
      city.current.style.border = '2px solid red'; 
      newErrors.push('City field is required');  
    } else {  
      city.current.style.border = '';  
    }  

    if (messageValue.length < 25) {  
      message.current.style.border = '2px solid red'; 
      newErrors.push('Message is too small.');  
    } else {  
      message.current.style.border = '';  
    }  

    if (!acceptConditionValue) {  
      newErrors.push('You must accept the conditions');  
    } else {  
      acceptConditions.current.style.outline = ''; 
    }  

    setErrors(newErrors);  

    
    
    return newErrors.length === 0;   
    
  };  

  const handleSubmit = (e) => {  
    e.preventDefault();  
    const isValid = handleFormValidation();  
    console.log(errors[0]);
    

    if (isValid) {  
      // Form is valid, process submission  
      setIsFormSent(true);  
      resetForm();  
    }  
  };  

  return (  
    <>  
      {isFormSent && (  
        <div className='allGood'>  
          <p>Message sent succefuly</p>  
        </div>  
      )}  
      {errors.length > 0 && (  
        <div className="allGood">  
          <div>Errors:</div>  
          <ul>  
            {errors.map((error, key) => (  
              <li key={key}>Error: {error}</li>  
            ))}  
          </ul>  
        </div>  
      )}  
      <div className='content'>  
        <h2 className="main-title">Contact form</h2>  
        <form className="formulaire" onSubmit={handleSubmit}>  
          <div className="form-group">  
            <span>Name </span>  
            <input type="text" name="name" ref={name} />  
            {errors[0]&& <span className="fieldWrong">Name is not valide</span>}
          </div>  
          <div className="form-group">  
            <span>City</span>  
            <input type="text" name="city" className='city' ref={city} />  
          </div>  
          <div className="form-group">  
            <span>Email</span>  
            <input type="text" name="mail" className='mail' ref={mail} />  
          </div>  
          <div className="form-group">  
            <span>Message</span>  
            <input type="text" name="message" className='message' ref={message} />  
          </div>  
          <div className="form-group">  
            <span>Accept conditions </span>  
            <input type="checkbox" name="acceptCondition" className='acceptCondition' ref={acceptConditions} />  
          </div>  
          <div className="form-group">  
            <input className="btn-principal" type="submit" value='Valide' />  
          </div>  
        </form>  
      </div>  
    </>  
  );  
}