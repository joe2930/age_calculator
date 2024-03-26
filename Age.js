const btn = document.getElementById('btn');
const day=document.getElementById('day');
const mon=document.getElementById('mon');
const yr=document.getElementById('yr');
const dday=document.getElementById('dday');
const dmon=document.getElementById('dmon');
const dyr=document.getElementById('dyr');
btn.addEventListener('click', function() 
{
    day.innerHTML="";
    mon.innerHTML="";
    yr.innerHTML="";
    const dbx1 = parseInt(document.getElementById('dbx1').value); 
    const dbx2 = parseInt(document.getElementById('dbx2').value); 
    const dbx3 = parseInt(document.getElementById('dbx3').value);

    let bool = isValidDay(dbx2, dbx1,dbx3);
    if (Array.isArray(bool)) 
    {
    bool.forEach(error=>
      {
        console.log(error)
        if(error==='Invalid month')
        {
          mon.innerHTML="Enter the valid Month";
          mon.style.color="red";
        }
     if(error==='Invalid day')
    {
      day.innerHTML="Enter the valid day";
      day.style.color="red";
    }
    
     if(error=='Invalid year')
    {
      yr.innerHTML="Enter the valid Year";
      yr.style.color="red";
    }
    })}
    else
    {
    let age=calculateAge(dbx1,dbx2-1,dbx3);
    console.log(age.days)
    dyr.innerHTML=`${age.years} <span style="color:#8A2BE2">Years</span>`;
    dmon.innerHTML=`${age.months}  <span style="color:#8A2BE2">Months</span>`
    dday.innerHTML=`${age.days}  <span style="color:#8A2BE2">Days</span>`
    }
});

function isValidDay(month, day, year) {
  const maxDay = new Date(year, month, 0).getDate(); 
  const error = [];

  if (isNaN(month) || month < 1 || month > 12) {
      error.push('Invalid month');
  }

  if (isNaN(day) || day < 1 || day > maxDay) {
      error.push('Invalid day');
  }

  if (isNaN(year) || year <= 0 || year < 1900) {
      error.push('Invalid year');
  }
  if (error.includes('Invalid day') && error.includes('Invalid month')) {
    const index = error.indexOf('Invalid day');
    error.splice(index, 1); 
    error.push('Invalid month'); 
}
  if (error.length === 0) {
      return 'valid';
  } else {
      return error;
  }
}


function calculateAge(day, month, year) {
  const today = new Date();
  const dob = new Date(year, month, day); // Month in JavaScript is 0-indexed
  let ageYears = today.getFullYear() - dob.getFullYear();
  let ageMonths = today.getMonth() - dob.getMonth();
  let ageDays = today.getDate() - dob.getDate();

  if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
      ageYears--; // Adjust years if birthday hasn't occurred yet in the current year
      ageMonths += 12; // Adjust months
  }

  if (ageDays < 0) {
      const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      ageDays = prevMonthLastDay - dob.getDate() + today.getDate(); // Adjust days
      ageMonths--; // Adjust months
  }

  return { years: ageYears, months: ageMonths, days: ageDays };
}

