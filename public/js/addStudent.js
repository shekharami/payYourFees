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
    if(res.data.status === 'success'){
        return 1
    }else{
        throw new Error('Something Went wrong, Please try again later.')
    }

}

//remove students
const removeStudents = document.getElementsByName('removeStudent');
if(removeStudents.length){
    removeStudents.forEach(c => {
        c.onclick = () => {
            c.style.display = 'none'
            c.parentElement.children[1].style.display = ''
            addOrRemove(c.id, 'remove')
            .then(a => { 
                if(a){
                    location.reload(true)
                }
            })
            .catch(err => {
                alert(err.message)
                c.parentElement.children[1].style.display = 'none'
                c.style.display = ''
            })
        }
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
                                <img src="/img/spinner.gif" alt="Loading" width="40" height="40" style='display:none;'>
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
                c.onclick = () => {
                    c.style.display = 'none'
                    c.parentElement.children[1].style.display = ''
                    addOrRemove(c.id, 'add')
                    .then(a => { 
                        if(a){
                            location.reload(true)
                        }
                    })
                    .catch(err => {
                        alert(err.message)
                        c.parentElement.children[1].style.display = 'none'
                        c.style.display = ''
                    })
                }
            }) 
        }else{
            alert('NO students found')
        }
    }
}