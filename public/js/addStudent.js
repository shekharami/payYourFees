import axios from 'axios'

const createCard = e => {
    return `<div class='student-card' id=${e.children[0].children[0].id}>
                  <h3 class='student-name'>${e.children[1].textContent}</h3>
                  <h5 class='student-class'>${e.children[3].textContent}  | Roll :  ${e.children[4].textContent}</h5>
                  <h3 class='student-class deselct' style='float:right;color:red; width:20px'>X</h3>
                  </div>`
}

const searchStudent = document.getElementById('searchStudent');
if(searchStudent){
    searchStudent.onclick = async e => {
        e.preventDefault()
        const name = document.getElementById('name').value.toLowerCase()
        const father = document.getElementById('father').value.toLowerCase()
        const mother = document.getElementById('mother').value.toLowerCase()
        const regNo = document.getElementById('regNo').value.toLowerCase()
        const uid = document.getElementById('uid').value
        const institute = document.getElementById('institute').selectedOptions[0].value
        
        if (!institute) {
            alert('Please select institute first!')
            return
        }
        if(!uid && !regNo && !name && (!father || !mother)){
            alert(`Please provide any one of ADHAAR, Registration No, 
            Students's Name or Father's name + Mother's name`)
            return
        }
        const res = await axios({
            method: 'POST',
            url : '/api/v1/student/search',
            data : { name,father, mother, regNo, uid, institute },
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        let html = '';
    
    let table = `<hr>
                <h2 style='color:green;text-align:center;text-decoration:underline;'>Step 2</h2>
                <p style='text-align:center;'>Click on 'Add' button below to select student whom you want to link.</p>
                    <table>
                        <tr>
                            <th>Selection</th>
                            <th>Name</th>
                            <th>Registration Number</th>
                            <th>Class (section)</th>
                            <th>Roll No.</th>
                            <th>Fees Paid Upto</th>
                        </tr>` ;
        if(res.data.status === 'success'){

            html += "<div>" 
            res.data.data.forEach( s => {
                let date = new Date(new Date(s.feesPaidTill).getMonth()+'-27-'+new Date(Date.now()).getFullYear());
                date = date.toLocaleString('en-us',{month: 'short'})+'-'+new Date(Date.now()).getFullYear()
                // html += `<div class='students-card'>        
                //             <input id ='${s.id}' type='checkbox' name='addStudent'style="float:right;width:20px;height:20px">
                //             <br><p>Name : ${s.name}</p>
                //             <p style='display:none;'>Registration No. : ${s.registrationNo}</p>
                //             <p> Class : ${s.class} ( ${s.section} )</p>
                //             <p>Roll No. : ${s.rollNo}</p>
                //             <p style="display:none;">Fees Paid Upto : ${date}</p>
                //         </div>`
                table += `<tr>
                            <td style='text-align:left';>
                                <!--<input id ='${s.id}' type='checkbox' name='addStudent'style="width:20px;height:20px;margin-right:50%;margin-left:50%;">-->
                                <button id= ${s.id} style='color:green;' name='addStudent'>Add</button>
                            </td>
                            <td>
                                ${s.name}
                            </td>
                            <td>
                                ${s.registrationNo}
                            </td>
                            <td>
                                ${s.class} ( ${s.section} )
                            </td>
                            <td>
                                ${s.rollNo}
                            </td>
                            <td>
                                ${date}
                            </td>
                          </tr>`
            });

            // html += '<br></div>'
            table += '</table>'

            // document.getElementById('returned-students').innerHTML = html;
            document.getElementById('returned-students').innerHTML = table;

            let step3 = `<hr>
                        <h2 style='color:green;text-align:center;text-decoration:underline;'>Step 3</h2>
                        <p style='text-align:center;'>Click LInk</p>
                        <div>`
            document.getElementsByName('addStudent')
            .forEach(c => {
                // c.onchange = () => {
                //     if(c.parentElement.parentElement.classList.length){
                //         c.parentElement.parentElement.classList.remove('selected')
                //     }else if(!c.parentElement.parentElement.classList.length){
                //         c.parentElement.parentElement.classList.add('selected')
                //     } 
                // }
                // 2nd solution 
                // c.onchange = () => {
                //     let bgclr = c.parentNode.parentElement.style.backgroundColor
                //     if(!bgclr || (bgclr === '#f2f2f2')){
                //         c.parentNode.parentElement.style.backgroundColor = 'lightgreen'
                //     }else if(bgclr === 'lightgreen'){
                //         c.parentNode.parentElement.style.backgroundColor = ''
                //     } 
                // }
                // 3rd solution
                c.onclick = () => {
                    step3 += createCard(c.parentElement.parentElement)
                    step3 += '</div>'
                    document.getElementById('step3').innerHTML = step3
                }
            }) 

        }else{
            alert('NO students found')
        }
    }
}

const selectedStudents = [];
const addStudentBtn = document.getElementById('addStudent-btn');
if(addStudentBtn){
    addStudentBtn.addEventListener('click', async ()=>{
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
        let students = [...document.getElementsByClassName('selected')]
        .splice(0,5)
        .map(s => s.children[0].id )

        const res = await axios({
            method: 'PATCH',
            url : '/api/v1/user/update?students=true',
            data : {students},
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        
        if(res.data.status === 'success'){
            alert('Data saved succefully')
        }else{
            alert(`something went wrong while tagging \nselected students to your account`)
        }

        opener.location.reload();
        window.close();
        
    })
}

