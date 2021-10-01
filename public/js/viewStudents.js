import axios from 'axios';

const cls = document.getElementById('cls');
if (cls) {
  const section = document.getElementById('section');
  const clear = document.getElementById('clear');
  const resultDiv = document.getElementById('result');
  const submit = document.getElementById('submit');

  const renderResult = ({ html = null, error = false, errorMsg = 'Please Select Class' }) => {
    if (error) {
      resultDiv.innerHTML = `<p style="text-align:center;color:red;">${errorMsg}</p>`;
      return;
    }
    resultDiv.innerHTML = html;
  };
  const clearResultDiv = () => {
    resultDiv.innerHTML = '';
  };
  const showSectionDropdown = (selectedCls) => {
    const sectionsArray = JSON.parse(cls.value)[selectedCls];
    sectionsArray.unshift('Select');
    sectionsArray.forEach((sec) => {
      const opt = document.createElement('option');
      opt.text = sec;
      section.add(opt);
    });
    section.style.display = '';
  };
  clear.onclick = () => {
    submit.style.display = 'none';
    clear.style.display = 'none';
    document.getElementsByTagName('label')[1].style.display = 'none';
    cls.selectedIndex = 0;
    cls.disabled = false;
    section.style.display = 'none';
    const sections = [...section.options];
    sections.forEach((o) => o.remove());
    renderResult({ error: true });
  };
  renderResult({ error: true });
  cls.onchange = () => {
    const selectedCls = cls.options[cls.selectedIndex].id;
    if (selectedCls === '0') {
      renderResult({ error: true });
      return;
    } else {
      cls.disabled = true;
      document.getElementsByTagName('label')[1].style.display = '';
      clearResultDiv();
      showSectionDropdown(selectedCls);
      submit.style.display = '';
      clear.style.display = '';
    }
  };

  const makeTable = ({ data, headersDataMapping }) => {
    if (!Array.isArray(data)) {
      throw new Error('Please provide data array.');
    }

    const headers = Object.keys(headersDataMapping);
    let html = `<table>`;
    headers.forEach((header) => {
      html += `<th>${header}</th>`;
    });
    data.forEach((obj) => {
      html += '<tr>';
      headers.forEach((header) => {
        const tempData = obj[headersDataMapping[header]];
        if (header === 'Action') {
          html += `<td>
                    <a href='student-detail/${tempData ? tempData : '-'}'>View Details</a>
                </td>`;
        } else {
          html += `<td>${tempData ? tempData : '-'}</td>`;
        }
      });
      html += '</tr>';
    });
    html += '</table>';
    return html;
  };

  submit.onclick = async () => {
    const selectedCls = cls.options[cls.selectedIndex].id;
    const selectedSec = section.options[section.selectedIndex].text;

    if (!selectedCls) {
      alert('Please select Class !');
      return;
    } else if (selectedSec === 'Select') {
      alert('Please select Section !');
      return;
    }
    const res = await axios({
      method: 'GET',
      url: `/api/v1/institute/getDetails?class=${selectedCls}&section=${selectedSec}`,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
    try {
      if (res.data.status === 'success') {
        if (!res.data.data.students.length) {
          throw new Error('No students Found.');
        }
        const headersDataMapping = {
          'Roll No.': 'rollNo',
          Name: 'name',
          "Father's Name": 'father',
          "Mother's Name": 'mother',
          Action: 'id'
        };
        const table = makeTable({ data: res.data.data.students, headersDataMapping });
        renderResult({ html: table });
      } else {
        throw new Error(res.data.error);
      }
    } catch (err) {
      renderResult({ error: true, errorMsg: err.message });
    }
  };
}
