import { months } from './staticData'

const addStudentImg = document.getElementById('addStudent-img');
if(addStudentImg){
    addStudentImg.addEventListener('click', ()=>{
        alert('Your previously tagged students data will be lost')
        window.open(
            '/link-student'
          );
    })
}

window.onload = () => {
    if(document.location.pathname === '/dashboard'){
    let o_str, o;
    let html = '';
    for(let i = 0 ; i< 5; i++){
        o_str = localStorage.getItem(`${i}`);
        if(o_str){
            o = JSON.parse(o_str);

            html += `<div class='students-card' id=${o.id}>
                    <input type='checkbox' name='card' >
                    <h3> Name : ${o.name}</h3> 
                    <p>Class : ${o.class}</p> 
                    <p>Registration No. : ${o.regNo}</p>
                    <p>Roll No. : ${o.roll}</p>
                    <p>Fees Paid Upto : ${o.feesPaidTill}</p>
                 </div>`
        }

        localStorage.removeItem(`${i}`);
    }

    if(o_str){    
        document.getElementById('added-students').innerHTML = html;
    }
    document.getElementsByName('card')
    .forEach(c => {
        c.onchange = () => {
            if(c.parentElement.classList.length === 2){
                c.parentElement.style.backgroundColor = '#f8f8ff'
                c.parentElement.classList.remove('selected')
            }else if(c.parentElement.classList.length===1){
                c.parentElement.classList.add('selected')
                c.parentElement.style.backgroundColor = 'lightgreen'
            } 
        }
    })
}
}

const checkout = [...document.getElementsByClassName('checkout')]
if(checkout.length){
    //since there are two buttons for proceeding to payment page
    checkout.forEach(button => {
        button.onclick = () => {
            const selectedStudents = [...document.getElementsByClassName('selected')]
            if(!selectedStudents.length){
                alert('Please select at least one student!')
                return
            }
            let i = 0;
            selectedStudents.forEach(s => {
                const dataset = s.children
                let nextPay = new Date(`02-${dataset[8].textContent.split(': ')[1]}`)
                let month = nextPay.getMonth() + 2
                const year = nextPay.getFullYear()
                nextPay = new Date(`25-${months[`${month}`]}-${year}`)
                const studObj = {
                    institute : dataset[3].id,
                    class : dataset[1].textContent,
                    nextPay ,
                    name : dataset[0].textContent
                }
                localStorage.setItem(`${i}`,JSON.stringify(studObj))
                i++
            })
            location.assign('/checkout')
        }
    })
} 