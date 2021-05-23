import axios from 'axios';

const searchStudent = document.getElementById('search-student');
if(searchStudent){
    searchStudent.addEventListener('click', async e =>{
        e.preventDefault();
        const regno = document.getElementById('regno').value;
        const name = document.getElementById('name').value.toLowerCase();
        const clas = document.getElementById('class').value;
        const section = document.getElementById('section').value;
        // Make network request
        if(!(regno || name || ( clas || section))) {
            alert('Please provide the details first.');
            return;
        }
        const res = await axios({
            method: 'GET',
            url : `/api/v1/student/search?${regno}&name=${name}&class=${clas}&section=${section}`,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        
        if(res.data.status === 'success'){

            let html1 = '', html3 = '', html2 = '';

            const classes = [], section = [];
            
            res.data.data.students.forEach(o => {
                if(!classes.includes(o.class)){
                    classes.push(o.class)
                }
                if(!section.includes(o.section)){
                    section.push(o.section)
                }

                html3 += `<tr>
                <td>${o.rollNo}</td>
                <td>${o.name}</td>
                <td>${o.class}</td>
                <td>${o.section}</td>
                <td>${o.feesPaidTill}</td>
                <td><a href='#'>View Details</a></td>
            </tr>
      <div id='student-detail' style='display:none;'>
                <p>Registration No. : ${o.registrationNo}</p>
                <p>Father's Name : ${o.father}</p>
                <p>Mother's Name : ${o.mother}</p>
                <p>Email : ${o.email}</p>
      <div>`;
            });

            html3 += '</table>';

            html1 += `<table>
                            <tr>
                                <th>Roll No.</th>
                                <th>Name</th><th>Class : <select>`;
            classes.forEach(c => {
                html1 += `<option>${c}</option>`;
            })
            html1 += ' </select></th>';

            html2 += `<th>Section : 
            <select>`;
            section.forEach(s => {
                html2 += `<option>${s}</option>`
            });
            html2 += `</select>
            </th>
            <th>Fees paid upto</th>
            <th>Action</th>
        </tr>`;

            const html = html1 + html2 + html3;
            const a = document.getElementById('result-table');
            a.innerHTML = html;
            a.style.display = '';

        }

    })
}