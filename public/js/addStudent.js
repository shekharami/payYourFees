import axios from 'axios'


const searchStudent = document.getElementById('searchStudent');
if(searchStudent){
    searchStudent.addEventListener('click', async e => {
        e.preventDefault()
        const father = document.getElementById('father').value;
        const mother = document.getElementById('mother').value;
        const regNo = document.getElementById('regNo').value;
        const res = await axios({
            method: 'POST',
            url : '/api/v1/student/search',
            data : { father, mother, regNo },
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        let html = '';
        if(res.data.status === 'success'){
            html += "<div>" 
            res.data.data.forEach( s => {
                let date = new Date(new Date(s.feesPaidTill).getMonth()+'-27-'+new Date(Date.now()).getFullYear());
                date = date.toLocaleString('en-us',{month: 'short'})+'-'+new Date(Date.now()).getFullYear()
                html += `<div style="background-color: beige;width: max-content;display: inline-block;padding: 10px;margin: 10px;">        
                            <input id ='${s.id}' type='checkbox' name='addStudent'style="float:right;width:20px;height:20px">
                            <p>Nmae : ${s.name}</p>
                            <p>Registration No. : ${s.registrationNo}</p>
                            <p> Class : ${s.class} ( ${s.section} )</p>
                            <p>Roll No. : ${s.rollNo}</p>
                            <p style="display:none;">Fees Paid Upto : ${date}</p>
                        </div>`
            });

            html += '<br></div>'

            document.getElementById('returned-students').innerHTML = html;
        }
    })
}

const selectedStudents = [];
const addStudentBtn = document.getElementById('addStudent-btn');
if(addStudentBtn){
    
    addStudentBtn.addEventListener('click', ()=>{
        document.getElementsByName('addStudent').forEach(o => { 
            if(o.checked){
                selectedStudents.push(o);
            }
        })
        if(selectedStudents.length){
            for(let i = 0; i < selectedStudents.length; i++){

                let o = { id: selectedStudents[i].id,
                    name: selectedStudents[i].parentNode.children[1].innerText.split(': ')[1],
                    regNo : selectedStudents[i].parentNode.children[2].innerText.split(': ')[1],
                    class : selectedStudents[i].parentNode.children[3].innerText.split(': ')[1],
                    roll : selectedStudents[i].parentNode.children[4].innerText.split(': ')[1],
                    feesPaidUpto : selectedStudents[i].parentNode.children[5].innerText.split(': ')[1] }

                localStorage.setItem(`${i}`, JSON.stringify(o))
            }
        }
        opener.location.reload();
        window.close();
    })
}

