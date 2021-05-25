const addStudentImg = document.getElementById('addStudent-img');
if(addStudentImg){
    addStudentImg.addEventListener('click', ()=>{
        window.open(
            '/add-student',
            '_blank' 
          );
    })
}

window.onload = () => {
    if(document.location.pathname === '/dashboard'){
    let o_str, o, div;
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
                    <p>Fees Paid Upto : ${o.feesPaidUpto}</p>
                 </div>`
        }

        localStorage.removeItem(`${i}`);
    }

    document.getElementById('added-students').innerHTML = html;

    document.getElementsByName('card')
    .forEach(c => {
        c.onchange = () => {
            if(c.parentElement.classList.length === 2){
                c.parentElement.classList.remove('selected')
            }else if(c.parentElement.classList.length===1){
                c.parentElement.classList.add('selected')
            } 
        }
    })
}
}
