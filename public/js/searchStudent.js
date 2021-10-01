import axios from 'axios';

const filterByClass = (cls) => {
  let tr = [...document.getElementsByTagName('tr')];
  tr = tr.splice(1, tr.length);
  let sect = [...document.getElementById('sectionFilter').options];
  sect = sect.splice(1, sect.length);
  if (cls === 'All') {
    tr.forEach((t) => (t.style.display = ''));
    sect.forEach((o) => (o.style.display = ''));
    return;
  } else {
    const sections = [];
    tr.forEach((t) => {
      if (!(t.children[2].innerText === cls)) {
        t.style.display = 'none';
      } else {
        t.style.display = '';
        let sec = t.children[3].innerText;
        if (!sections.includes(sec)) {
          sections.push(sec);
        }
      }
    });

    sect.forEach((o) => {
      if (!sections.includes(o.innerText)) {
        o.style.display = 'none';
      } else {
        o.style.display = '';
      }
    });
  }
};

const filterBySection = (sec) => {
  let tr = [...document.getElementsByTagName('tr')];
  tr = tr.splice(1, tr.length);
  if (sec === 'All') {
    tr.forEach((t) => (t.style.display = ''));
    return;
  }
  tr.forEach((t) => {
    if (!t.children[3].innerText.includes(sec)) {
      t.style.display = 'none';
    } else {
      t.style.display = '';
    }
  });
};

// const sortStudents = (students) => {
//     const
//     return students
// }

const searchStudent = document.getElementById('search-student');
if (searchStudent) {
  const months = {
    1: 'JAN',
    2: 'FEB',
    3: 'Mar',
    4: 'APR',
    5: 'MAY',
    6: 'JUN',
    7: 'JUL',
    8: 'AUG',
    9: 'SEP',
    10: 'OCT',
    11: 'NOV',
    12: 'DEC'
  };
  searchStudent.addEventListener('click', async (e) => {
    e.preventDefault();
    const regno = document.getElementById('regno').value;
    const name = document.getElementById('name').value.toLowerCase();
    const clas = document.getElementById('class').value;
    const section = document.getElementById('section').value;
    // Make network request
    if (!(regno || name || clas)) {
      alert('Please provide the details first.');
      return;
    }
    const res = await axios({
      method: 'GET',
      url: `/api/v1/student/search?${regno}&name=${name}&class=${clas}&section=${section}`,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });

    if (res.data.status === 'success') {
      const numResult = res.data.data.students.length * 1;
      document.getElementById('num-results').textContent = `${numResult} Results Found.`;
      if (numResult) {
        document.getElementById('export').style.display = '';
      }

      res.data.data.students.sort();

      let html1 = '',
        html3 = '',
        html2 = '';

      const classes = [],
        section = [];
      let feesPaidTill, month, year;

      res.data.data.students
        .sort((a, b) => a.rollNo * 1 - b.rollNo * 1)
        .forEach((o) => {
          if (!classes.includes(o.class)) {
            classes.push(o.class);
          }
          if (!section.includes(o.section)) {
            section.push(o.section);
          }
          feesPaidTill = o.feesPaidTill; //.split('-')
          // year = feesPaidTill[0]
          // month = feesPaidTill[1]*1
          html3 += `<tr>
                <td>${o.rollNo}</td>
                <td>${o.name}</td>
                <td>${o.class}</td>
                <td>${o.section}</td>
                <td>${o.feesPaidTill}</td>
                <!--<td>{months[month] {year}</td> -->
                <td><button id=${o.id} name='view-details'>View Details</button></td>
                </tr>`;
        });

      section.sort();

      html3 += '</table>';

      html1 += `<table>
                            <tr>
                                <th>Roll No.</th>
                                <th>Name</th><th>Class : <select id='classFilter'>`;

      const wts_r = {
        1: 'I',
        2: 'II',
        3: 'III',
        4: 'IV',
        5: 'V',
        6: 'VI',
        7: 'VII',
        8: 'VIII',
        9: 'IX',
        10: 'X',
        11: 'XI',
        12: 'XII'
      };
      const wts = {
        I: 1,
        II: 2,
        III: 3,
        IV: 4,
        V: 5,
        VI: 6,
        VII: 7,
        VIII: 8,
        IX: 9,
        X: 10,
        XI: 11,
        XII: 12
      };
      html1 += '<option>All</option>';
      classes
        .map((c) => {
          return wts[c];
        })
        .sort((a, b) => a - b)
        .map((a) => {
          return wts_r[a];
        })
        .forEach((c) => {
          html1 += `<option>${c}</option>`;
        });
      html1 += ' </select></th>';

      html2 += `<th>Section : 
            <select id='sectionFilter'><option>All</option>`;
      section.forEach((s) => {
        html2 += `<option>${s}</option>`;
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

      [...document.getElementsByName('view-details')].forEach((button) => {
        button.onclick = () => {
          location.assign(`/institute/student-detail/${button.id}`);
        };
      });

      const [cls, sec] = document.getElementsByTagName('select');
      const classFilter = document.getElementById('classFilter');
      const sectionFilter = document.getElementById('sectionFilter');
      classFilter.onchange = () => {
        filterByClass(cls[cls.selectedIndex].innerText);
      };
      sectionFilter.onchange = () => {
        filterBySection(sec[sec.selectedIndex].innerText);
      };
    }
  });
}
