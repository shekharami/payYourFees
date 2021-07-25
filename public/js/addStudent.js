import axios from 'axios'

const addOrRemove = async (id, action) => {
    const data = {students : id, action : { add : false, remove : false }} ;
    (action === 'add') ? (data.action.add = true ): (data.action.remove = true) ;
    const res = await axios({
        method: 'PATCH',
        url : '/api/v1/user/update',
        data,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    if(res.data.status === 'success') 
        location.reload(true)

}

//remove students
const removeStudents = document.getElementsByName('removeStudent');
if(removeStudents.length){
    removeStudents.forEach(c => {
        c.onclick = () => addOrRemove(c.id, 'remove')
    }) 
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
                            <th>Action</th>
                            <th>Name</th>
                            <th>Registration Number</th>
                            <th>Class (section)</th>
                            <th>Roll No.</th>
                            <th>Fees Paid Upto</th>
                        </tr>` ;
        if(res.data.status === 'success'){
            res.data.data.forEach( s => {
                let date = new Date(new Date(s.feesPaidTill).getMonth()+'-27-'+new Date(Date.now()).getFullYear());
                date = date.toLocaleString('en-us',{month: 'short'})+'-'+new Date(Date.now()).getFullYear()
                table += `<tr>
                            <td style='text-align:left';>
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
            table += '</table>'
            document.getElementById('returned-students').innerHTML = table;
            document.getElementsByName('addStudent')
            .forEach(c => {
                c.onclick = () => addOrRemove(c.id, 'add')
               // make network request to add students
            }) 

        }else{
            alert('NO students found')
        }
    }
}

/*
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

*/