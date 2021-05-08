import '@babel/polyfill';
import { signUp, login, logout } from './loginSignup'

const signupRedirectBtn = document.getElementById('signup-redirect-btn');
if(signupRedirectBtn){
    
    signupRedirectBtn.addEventListener('click', ()=>{
        
        let redirectlink
        document.getElementsByName('signup-radio').forEach(e => {
            if(e.checked){
                redirectlink = e.value;
            }
        })
        if(!redirectlink){
            alert('Please select an option')
            return
        }
        redirectlink = '/' + redirectlink + '-signup'
        document.getElementById('signup-redirect-link').href = redirectlink
    })

}

const loginRedirectBtn = document.getElementById('login-redirect-btn');
if(loginRedirectBtn){
    loginRedirectBtn.addEventListener('click', ()=>{
        let redirectlink
        document.getElementsByName('login-radio').forEach(e => {
            if(e.checked){
                redirectlink = e.value;
            }
        })
        if(!redirectlink){
            alert('Please select an option')
            return
        }
        redirectlink = '/' + redirectlink + '-login'
        document.getElementById('login-redirect-link').href = redirectlink
    })

}

const userSignup = document.getElementById('user-signup');
if(userSignup){
    userSignup.addEventListener('click', async e => {
        e.preventDefault()

        userSignup.value = 'Please Wait !'

        const name = document.getElementById('full-name').value
        const email = document.getElementById('email').value 
        const phone = document.getElementById('phone-number').value
        const password = document.getElementById('user-password').value 
        const confirmPassword = document.getElementById('confirm-password').value 
        const address1 = document.getElementById('address1').value 
        const address2 = document.getElementById('address2').value  
        const address3 = document.getElementById('address3').value 
        const city = document.getElementById('address-city').value 
        const district = document.getElementById('address-district').value 
        const pincode = document.getElementById('pincode').value 
        const state = document.getElementById('address-state').value 

        if(!name){
            alert('Please provide your name')
            
        }else if(!phone){
            alert('Please provide your phone number') 
        }else if(isNaN(phone*1) || phone.length !== 10){
            alert('Invalid phone number')
        }else if(!password){
            alert('Please provide password')
        }else if( !confirmPassword ){
            alert('Please confirm your password')
        }else if( password !== confirmPassword ){
            alert('Passwords do not match')
        }else if( !address1 ){
            alert('please provide your address')
        }else if( !district ){
            alert('please provide your district')
        }else if( !pincode){
            alert('please provide your pincode')
        }else if( isNaN(pincode*1) || pincode.length !== 6){
            alert('incorrect pincode')
        } else if( !state ){
            alert('please provide your state')
        }else{

            // server request
            const response = await signUp('user', 
            { 
                name, 
                email, 
                phone:[phone], 
                password, 
                confirmPassword, 
                address1, 
                address2, 
                address3, 
                city, 
                district, 
                pincode, 
                state 
            })
            console.log(response)
            //after response is recieved set button text as before
            userSignup.value = 'Create an Account'
            // redirect to logged in homepage to users

            //to do
        }
    })
}

const instituteSignup = document.getElementById('institute-signup');
if(instituteSignup){
    instituteSignup.addEventListener('click', async e => {
        e.preventDefault()

        instituteSignup.value = 'Please Wait !'

        let instituteType
        document.getElementsByName('institute').forEach(p => {
            if(p.checked){
                instituteType = p.value
            }
        })
        const name = document.getElementById('full-name').value
        const email = document.getElementById('email').value 
        const phone = document.getElementById('phone-number').value
        const alternatePhone = document.getElementById('alternate-phone-number').value 
        const password = document.getElementById('user-password').value 
        const confirmPassword = document.getElementById('confirm-password').value 
        const address1 = document.getElementById('address1').value 
        const address2 = document.getElementById('address2').value  
        const address3 = document.getElementById('address3').value 
        const city = document.getElementById('address-city').value 
        const district = document.getElementById('address-district').value 
        const pincode = document.getElementById('pincode').value 
        const state = document.getElementById('address-state').value 

        if(!instituteType){
            alert('Please select Institute Type')
        }else if(!name){
            alert('Please provide your name')
        }else if(!phone){
            alert('Please provide your phone number') 
        }else if(isNaN(phone*1) || phone.length !== 10){
            alert('Invalid phone number')
        }else if(!password){
            alert('Please provide password')
        }else if( !confirmPassword ){
            alert('Please confirm your password')
        }else if( password !== confirmPassword ){
            alert('Passwords do not match')
        }else if( !address1 ){
            alert('please provide your address')
        }else if( !district ){
            alert('please provide your district')
        }else if( !pincode){
            alert('please provide your pincode')
        }else if( isNaN(pincode*1) || pincode.length !== 6){
            alert('incorrect pincode')
        } else if( !state ){
            alert('please provide your state')
        }else{

            const numbers = [phone]
            if(alternatePhone){
                numbers.push(alternatePhone)
            }
            // server request
            const response = await signUp('institute', 
            { 
                instituteType,
                name, 
                email, 
                phone: numbers,
                password, 
                confirmPassword, 
                address1, 
                address2, 
                address3, 
                city, 
                district, 
                pincode, 
                state 
            })
            console.log(response)
            //after response is recieved set button text as before
            userSignup.value = 'Create an Account'
            // redirect to logged in homepage to users

            //to do
        }
    })
}