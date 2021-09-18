import axios from 'axios';

const editStudent = document.getElementById('editStudent')
if(editStudent){
    editStudent.onclick = () => {
        editStudent.style.display = 'none';
        
        const father = document.getElementById('father').children[0].textContent ; 
        const mother = document.getElementById('mother').children[0].textContent ;
        let email = document.getElementById('email')
        if(email.children[0]){
            email = email.children[0].textContent ;
        }else{
            email = ''
        }
        let phone = document.getElementById('phone')
        if(phone.children[0]){
            phone = phone.children[0].textContent ;
        }else{
            phone = ''
        }
        const clas = document.getElementById('class').children[0].textContent ;
        let section = document.getElementById('section')
        if(section.children[0]){
            section = section.children[0].textContent ;
        }else{
            section =''
        }
        const rollNo = document.getElementById('rollNo').children[0].textContent ;

        document.getElementById('father').innerHTML = `<input type='text' value='${father}'>`
        document.getElementById('mother').innerHTML = `<input type='text' value='${mother}'>`
        document.getElementById('email').innerHTML = `<input type='text' value='${email}'>`
        document.getElementById('phone').innerHTML = `<input type='text' value='${phone}'>`
        document.getElementById('class').innerHTML = `<input type='text'  value='${clas}'>`
        document.getElementById('section').innerHTML = `<input type='text' value='${section}'>`
        document.getElementById('rollNo').innerHTML = `<input type='text' value='${rollNo}'>`;
        document.getElementById('active').style='';

        document.getElementById('actionButtons').style.display = '';
    }
}

const saveStudenetDetail = document.getElementById('saveStudentDetail')
if(saveStudenetDetail){
    saveStudenetDetail.onclick = async () => {
        const father = document.getElementById('father').children[0].value ; 
        const mother = document.getElementById('mother').children[0].value ;
        let email = document.getElementById('email')
        if(email.children[0]){
            email = email.children[0].value ;
        }else{
            email = ''
        }
        const phone = document.getElementById('phone').children[0].value ;
        const clas = document.getElementById('class').children[0].value ;
        const section = document.getElementById('section').children[0].value ;
        const rollNo = document.getElementById('rollNo').children[0].value ;
        // const active = document.getElementById('activeFlag').selectedOptions[0].value ;

        const res = await axios({
            method: 'POST',
            url : '/api/v1/student/update',
            data : { id: document.getElementsByTagName('h1')[0].id, father, mother, email, phone, clas, section, rollNo},
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        if(res.data.status === 'success'){
            alert('Saved Successfully !')
            location.reload(true)
        }
    }
}

const cancelStudenetDetail = document.getElementById('cancelStudentDetail')
if(cancelStudenetDetail){
    cancelStudenetDetail.onclick = () => {
        location.reload(true)
    }
}

const modifyRegistration = async activeFlag => {
    const res = await axios({
        method: 'POST',
        url : '/api/v1/student/update',
        data : { activeFlag : 1, id : document.getElementsByTagName('h1')[0].id, active : activeFlag},
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    return res.data.status
}

const deregisterStudent = document.getElementById('deregisterStudent');
if(deregisterStudent){
    deregisterStudent.onclick = async () => {

        if(await modifyRegistration(false) === 'success'){
            alert('Operation Successful !')
            location.reload(true)
        }
    }
}

const registerStudent = document.getElementById('registerStudent');
if(registerStudent){
    registerStudent.onclick = async () => {

        if(await modifyRegistration(true) === 'success'){
            alert('Operation Successful !')
            location.reload(true)
        }
    }
}


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("recordPayment");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const save = document.getElementById('save');
if(save){
    save.onclick = async () => {
        let fee = document.getElementById('fees').options;
        fee = fee[fee.selectedIndex].id;
        let date =  document.getElementById('date').value;
        if(!fee || !date){
            alert('Asterisk marked fields are mandatory!')
            return 
        }
        date = new Date(date);
        const amount =  document.getElementById('amount').value || null;
        const note =  document.getElementById('note').value || null;
        const studentId = document.getElementsByTagName('h1')[0].id;
        const res = await axios({
            method: 'POST',
            url : '/api/v1/payments/record-cash-payment',
            data : { fee , date, amount, note, mode : 'offline' , studentId },
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            console.log(res)

    }
}

