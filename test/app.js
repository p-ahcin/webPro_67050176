// 1. ดึง Element ของ Form และกล่องแสดงผล มาเก็บไว้ในตัวแปรด้วย getElementById[cite: 1]
const gradeForm = document.getElementById('gradeForm');
const resultArea = document.getElementById('resultArea');

// 2. ดักจับ Event 'submit' เมื่อผู้ใช้กดปุ่มในฟอร์ม[cite: 1]
gradeForm.addEventListener('submit', function(event) {
    
    // สำคัญที่สุด!: ป้องกันไม่ให้หน้าเว็บ Refresh เมื่อกด Submit[cite: 1]
    event.preventDefault(); 

    // 3. ดึงค่า (value) ที่ผู้ใช้กรอกเข้ามาในช่อง Input[cite: 1]
    const name = document.getElementById('studentName').value;
    const score = document.getElementById('studentScore').value; 

    // 4. สร้างตัวแปรมารับค่าเกรด และใช้เงื่อนไข if-else ตรวจสอบคะแนน[cite: 4]
    let grade = "";
    
    if (score >= 80) {
        grade = "A";
    } else if (score >= 60) {
        grade = "B";
    } else {
        grade = "F";
    }

    // 5. นำผลลัพธ์ที่คำนวณได้ ไปแทรกใน HTML ด้วย innerHTML[cite: 1]
    // (ใช้เครื่องหมาย Backtick ` ในการแทรกตัวแปรง่ายๆ หรือจะใช้การบวก String ด้วย + ก็ได้)
    resultArea.innerHTML = `
        <p>ชื่อ-นามสกุล: <strong>${name}</strong></p>
        <p>คะแนนสอบ: ${score} คะแนน</p>
        <p>เกรดที่ได้: <strong style="color:red;">${grade}</strong></p>
    `;

    // (เพิ่มเติม) ล้างค่าในช่องกรอกข้อมูลให้ว่างเปล่าเพื่อพร้อมรับค่าใหม่
    gradeForm.reset();
});