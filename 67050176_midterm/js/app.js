//  Initial Mock Data Structure
const initialEvents = [
  {
    id: 1,
    title: "Modern JavaScript & ES6+ Workshop",
    category: "Tech",
    speaker: "Dr. Somchai Dev",
    date: "2026-09-15",
    seats: 5,
    description: "เจาะลึกการใช้งาน JavaScript ยุคใหม่ อธิบายเรื่อง Async/Await, Closure และ Modules",
    isRegistered: false
  },
  {
    id: 2,
    title: "UX/UI Design System Creation",
    category: "Design",
    speaker: "Aj. Ananya Design",
    date: "2026-09-20",
    seats: 0,
    description: "การสร้าง Design System สำหรับองค์กรขนาดใหญ่ด้วย Figma และการเชื่อมต่อกับ CSS",
    isRegistered: false
  },
  {
    id: 3,
    title: "Startup Pitching & Funding 101",
    category: "Business",
    speaker: "Khun Vorapat VC",
    date: "2026-09-25",
    seats: 12,
    description: "เทคนิคการนำเสนอแผนธุรกิจเพื่อระดมทุนสำหรับนักศึกษาสายเทคโนโลยี",
    isRegistered: false
  },
  {
    id: 4,
    title: "Cybersecurity Essentials for Web Apps",
    category: "Tech",
    speaker: "Dr. Prasit Security",
    date: "2026-10-01",
    seats: 8,
    description: "เรียนรู้ช่องโหว่พื้นฐาน OWASP Top 10 และแนวทางการป้องกันบน Web Front-end",
    isRegistered: false
  }
];

// App State
let events = [];

//เพิ่มโค้ดคำสั่งตรงนี้

function saveData() {
  localStorage.setItem('smartEventData', JSON.stringify(events));
}

function updateStats(data) {
  const totalEvents = data.length;
  const totalRegistered = data.filter(event => event.isRegistered === true).length;
  let totalAvailable = 0;
  data.forEach(event => {
    totalAvailable += Number(event.seats);
  });
  
  document.getElementById('totalEvents').textContent = totalEvents
  document.getElementById('totalRegistered').textContent = totalRegistered;
    document.getElementById('totalAvailable').textContent = totalAvailable;
}

function renderEvents(data) {
  const container = document.getElementById('eventContainer');
  container.innerHTML = '';

  data.forEach(event => {
    const isFull = event.seats === 0;
    const isRegis = event.isRegistered;

    let btnText = 'ลงทะเบียน';
    let btnDisabled = '';

    if (isRegis) {
        btnText = 'ลงทะเบียนแล้ว';
        btnDisabled = 'disabled';
    } else if (isFull) {
        btnText = 'ที่นั่งเต็ม';
        btnDisabled = 'disabled';
    }

    const cardHTML = `
      <div style="border: 1px solid #ccc; padding: 15px; margin-bottom: 10px; border-radius: 8px;">
        <h3 style="margin: 0 0 10px 0;">${event.title}</h3>
        <p><strong>ประเภท:</strong> ${event.category}</p>
        <p><strong>วิทยากร:</strong> ${event.speaker}</p>
        <p><strong>วันที่จัดงาน:</strong> ${event.date}</p>
        <!-- เปลี่ยนสีตัวเลข ถ้าเต็มให้เป็นสีแดง -->
        <p><strong>ที่นั่งว่าง:</strong> <span style="color: ${isFull ? 'red' : 'blue'};">${event.seats}</span></p>
        <p>${event.description}</p>
        
        <button type="button" onclick="registerEvent(${event.id})" ${btnDisabled} style="margin-top: 10px; cursor: ${btnDisabled ? 'not-allowed' : 'pointer'};">
            ${btnText}
        </button>
      </div>
    `;
    container.innerHTML += cardHTML
  });
  updateStats(data);
}

function applyFilters() {
  const searchText = document.getElementById('searchInput').value.toLocaleLowerCase();
  const categoryValue = document.getElementById('eventCategory').value.toLocaleLowerCase();
  const sortValue = document.getElementById('sortBy').value;

  let filterEvents = events.filter (event => {
    const matchText = event.title.toLocaleLowerCase().includes(searchText);
    const matchCategory = categoryValue === 'all' || event.category.toLocaleLowerCase() === categoryValue;
    return matchText && matchCategory;
  });

  if (sortValue === 'date-asc') {
    filterEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  else if (sortValue === 'seats-asc') {
    filterEvents.sort((a, b) => a.seats - b.seats);
  }
  else if (sortValue === 'seats-desc') {
    filterEvents.sort((a, b) => b.seats - a.seats);
  }
  renderEvents(filterEvents);
}

document.querySelector('.btnDarkMode').addEventListener('click', () => {
  const isDark = document.body.style.backgroundColor === 'rgb(34, 34, 34)';
  document.body.style.backgroundColor = isDark ? 'white' : 'rgb(34, 34, 34)';
  document.body.style.color = isDark ? 'black' : 'white';
});

function registerEvent(eventId) {
  const index = events.findIndex(e => e.id == eventId);

  if (index != -1) {
    if (events[index].seats > 0 && events[index].isRegistered === false) {
      events[index].seats -= 1;
      events[index].isRegistered = true;

      saveData();
      applyFilters();
      alert('ลงทะเบียนสำเร็จ')
    }
  }
}


// Run Application
function initApp() {
  const storedData = localStorage.getItem('smartEventData');
  
  if (storedData) {
    events = JSON.parse(storedData);
  }
  else {
    events = JSON.parse(JSON.stringify(initialEvents));
  }
  renderEvents(events);
  document.getElementById('searchInput').addEventListener('input', applyFilters);
  document.getElementById('eventCategory').addEventListener('change', applyFilters);
  document.getElementById('sortBy').addEventListener('change', applyFilters);
  document.getElementById('searchForm').addEventListener('reset', function() {
    setTimeout(() => {applyFilters();}, 0);
  });

  document.getElementById('btnHardReset').addEventListener('click', () => {
    if(confirm('แน่ใจหรือไม่ว่าต้องการคืนค่าทั้งหมด')) {
      localStorage.removeItem('smartEventData');
      location.reload();
    }
  });
}

document.addEventListener("DOMContentLoaded", initApp);