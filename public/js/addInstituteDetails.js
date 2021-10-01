import { updateInstituteData } from './apiCalls';
const addInstituteDetails = document.getElementById('addInstituteDetails');
if (addInstituteDetails) {
  /* Select all checkbox toggle functionality */
  const selectAll = document.getElementById('select-all');
  const classes = document.getElementsByName('class');
  selectAll.onchange = () => {
    if (selectAll.checked) {
      classes.forEach((o) => (o.checked = true));
    } else {
      classes.forEach((o) => (o.checked = false));
    }
  };

  classes.forEach(
    (o) =>
      (o.onchange = () => {
        if (!o.checked) {
          document.getElementById('select-all').checked = false;
        }
      })
  );

  /* Update database make api call */

  const addDetails = document.getElementById('add-details');
  addDetails.addEventListener('click', async (e) => {
    e.preventDefault();
    const pan = document.getElementById('pan').value;
    const gst = document.getElementById('gst').value;
    const classes = [];
    document.getElementsByName('class').forEach((e) => {
      if (e.checked) {
        classes.push(e.value);
      }
    });

    const response = await updateInstituteData({ pan, gst, classes });
    if (response.data.status === 'success') {
      location.reload(true);
    }
  });
}
