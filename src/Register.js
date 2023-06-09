import logo from './img/cblogo.png';
import React, { useRef} from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Document, Page, pdfjs} from 'react-pdf';
import nda from './docs/NDA.pdf';
import saasa from './docs/SaaSA.pdf';
import dpa from './docs/DPA.pdf';












const $ = require('jquery');


function Register() {




	

		const formRef = useRef(null);
		const EmailRef = useRef(null);
		const PasswordRef = useRef(null);
		const Password2Ref = useRef(null);
		const websiteLinkRef = useRef(null);
		const CvrRef = useRef(null);
		const CompanynameRef = useRef(null);
	


		//   const openTerms = (event) => {
		// 	event.preventDefault();
		// 	 window.location.href = './NDA.pdf';
		//   };


	
	function checkInputs() {
		
		const emailValue = EmailRef.current.value.trim();
		const passwordValue = PasswordRef.current.value.trim();
		const password2Value = Password2Ref.current.value.trim();
		const websitelinkvalue = websiteLinkRef.current.value.trim();
		const cvrvalue = CvrRef.current.value.trim();
		const companynamevalue = CompanynameRef.current.value.trim();
	
		if (websitelinkvalue === '') {
			setErrorFor(websiteLinkRef.current, 'Cannot be blank');
		  } else {
			setSuccessFor(websiteLinkRef.current);
		  }

		  
		if (cvrvalue === '') {
			setErrorFor(CvrRef.current, 'Cannot be blank');
		  } else {
			setSuccessFor(CvrRef.current);
		  }

		  if (companynamevalue === '') {
			setErrorFor(CompanynameRef.current, 'Cannot be blank');
		  } else {
			setSuccessFor(CompanynameRef.current);
		  }

	
		if (emailValue === '') {
		  setErrorFor(EmailRef.current, 'Cannot be blank');
		} else if (!isEmail(emailValue)) {
		  setErrorFor(EmailRef.current, 'Not a valid email');
		} else {
		  setSuccessFor(EmailRef.current);
		}
	
		if (passwordValue === '') {
		  setErrorFor(PasswordRef.current, 'Cannot be blank');
		} else {
		  setSuccessFor(PasswordRef.current);
		}
	
		if (password2Value === '') {
		  setErrorFor(Password2Ref.current, 'Cannot be blank');
		} else if (passwordValue !== password2Value) {
		  setErrorFor(Password2Ref.current, 'Passwords do not match');
		} else {
		  setSuccessFor(Password2Ref.current);
		}
	  }
	
	  function setErrorFor(input, message) {
		const formControl = input.parentElement;
		const small = formControl.querySelector('small');
		formControl.className = 'form-control error';
		small.innerText = message;
	  }
	
	  function setSuccessFor(input) {
		const formControl = input.parentElement;
		formControl.className = 'form-control success';
	  }
	  
	
	  function isEmail(email) {
		return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
	  }



	  
	  function handleFormSubmit(formData) {
		const url = 'https://costbitswebapptest.azurewebsites.net/user';
	  
		// Convert form data to JSON
		const data = JSON.stringify({


		"Name":formData.CompanynameRef,
		"WebsiteUrl": formData.WebsiteLink,
		"VatNum" : formData.CvrRef,
		"Email": formData.Email,
		"Password": formData.PasswordRef,
		"AccessCode" :  formData.code,
		}); 
		fetch(url, {
		  method: 'POST',
		  mode: 'cors',
		  headers: {
			'Content-Type': 'application/json', 
			
		  },
		  body: data
		})
		.then(response => {
		  if (response.ok) {
				console.log('it has been sent')	
				console.log(data)
		  } else {
			console.log('Error sending data');
		  }
		})
		.catch(error => {
		  
		});
	  }
	  
	  function handleSubmit(event) {
		event.preventDefault();
		checkInputs();
		formRef.current.reset()

	
		// Get form data
		const formData = {
		  
		  WebsiteLink: formRef.current.querySelector('#link').value,
		  Email: formRef.current.querySelector('#email').value,
		  CvrRef: formRef.current.querySelector('#cvr').value,
		  CompanynameRef: formRef.current.querySelector('#Vikname').value,
		  PasswordRef: formRef.current.querySelector('#password').value,
		  password2: formRef.current.querySelector('#password2').value,
		  løsning: formRef.current.querySelector('#løsning').value,
		  code: formRef.current.querySelector('.code').value,
		  'checkbox-1': formRef.current.querySelector('#checkbox-1').checked,
		  'checkbox-2': formRef.current.querySelector('#checkbox-2').checked,
		  'checkbox-3': formRef.current.querySelector('#checkbox-3').checked
		};
	  
	
		// Handle form data
		handleFormSubmit(formData);
	  }

	  

  return (
		<>
		<html lang='en'/>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<Helmet>
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		</Helmet>	
		
        <body>
          <div className="container">
            <div className="header">
              <img src={logo} alt="logo" className="logo" />
			
            </div>
            <form id="form" className="form" onSubmit={handleSubmit} ref={formRef}>
              <div className="form-control">
                {/* <label htmlFor="Username">First and lastname</label>
                <input type="text" placeholder="" id="Username" ref={UsernameRef }/>
                <small>Error message</small> */}
              </div>

			  <div className="form-control">
                <label htmlFor="Vikname">Company Name</label>
                <input type="text" placeholder="" id="Vikname" ref={CompanynameRef} name= "Vikname"/>
                <small>Error message</small>
              </div>

              <div className="form-control">
                <label htmlFor="link">Company Website</label>
                <input type="text" placeholder="" id="link" ref={websiteLinkRef} name="link"/>
                <small>Error message</small>
              </div>


              <div className="form-control">
                <label htmlFor="cvr">Company Registration Number</label>
                <input type="text" placeholder="" id="cvr" ref={CvrRef} name="cvr"/>
                <small>Error message</small>
              </div>


				<div className="form-control">
						<label htmlFor="email">Email</label>
						<input type="email" placeholder="" id="email" name= "email" ref={EmailRef}/>
						<small>Error message</small>
					</div>

          
			  <hr style={{marginTop: '30px', marginBottom: '10px' , lineHeight: '0px', border: 'none', alignContent: 'center', width: '200px', borderBottom: 'dotted orange 7px' }}></hr>

              <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="" id="password" ref={PasswordRef} name= "password" />
                <small>Error message</small>
              </div>

              <div className="form-control">
                <label htmlFor="password2">Confirm Password</label>
                <input type="password" placeholder="" id="password2"ref={Password2Ref}/>
                <small>Error message</small>
              </div>
			  <hr style={{marginTop: '30px', marginBottom: '10px' , lineHeight: '0px', border: 'none', alignContent: 'center', width: '200px', borderBottom: 'dotted orange 7px' }}></hr>

              <div className="form-control">
                <label htmlFor="løsning">Choice Your Finance System</label>
                <input type="text" id="løsning" list="løsning1" required  name='solution'/>
                <datalist id="løsning1">
                  <option value="Demo 0dkk" />
                  <option value="Demo 12dkk" />
                  <option value="Demo 240dkk" />
                </datalist>
				<label style={{fontSize: '15px', fontWeight: '500' , fontFamily: 'Arial, sans-serif', border: 'none', marginTop: '10px', display: 'block', margin: 'auto', width: '95%'}}>
					E-conomic acces code: <br></br>
					1.Open e-conomic and log in <br></br>
					2.Open this link: https://secure.e-conomic.com <br></br>
					3.Press connect with e-conomic <br></br>
					4.Copy the code and enter it here <br></br>
					<input className='code' id = "code"  name= "code" style={{borderStyle: 'solid #f0f0f0 2px;'}}></input>

				</label>
			  <hr style={{marginTop: '30px', marginBottom: '10px' , lineHeight: '0px', border: 'none', alignContent: 'center', width: '200px', borderBottom: 'dotted orange 7px' }}></hr>
                <small>Error message</small>
              </div>

             




				
			<div class="checkbox-section">
			
				<div className="checkbox-item">
					<input type="checkbox" id="checkbox-1" name="checkbox-1 " />
					<label htmlFor="checkbox-1">I accept CostBits Non <a  href={nda} target= '_blank' id='link1'  style={{color: 'blue', textDecoration: 'underline'}}>Disclosure Agreement</a></label>
				</div>

			<div class="checkbox-item">
					<input type="checkbox" id="checkbox-2" name="checkbox-2" />
					<label htmlFor="checkbox-2">I accept CostBits Data <a  href={saasa} target= '_blank'id='link2'   style={{color: 'blue', textDecoration: 'underline'}}>Processing Agreement</a></label> 
				</div>
				
				<div class="checkbox-item">
					<input type="checkbox" id="checkbox-3" name="checkbox-3"  />
					<label htmlFor="checkbox-3">I accept Terms and <a href={dpa} target= '_blank' id= 'link3'  style={{color: 'blue', textDecoration: 'underline'}}> Conditions</a></label>
				
				</div>
				
			
				</div>

				<button id="btn" style={{marginBottom: "20px"}}  >Submit</button>
		
		        </form>

				<></>
	                </div>
				</body>
				
        </>
		

		
    )
  }


export default Register


