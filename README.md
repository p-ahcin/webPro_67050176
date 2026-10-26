# Web Programming · 67050176

คลังแบบฝึกหัด งานปฏิบัติ และงานสอบรายวิชา **Web Programming**
รวบรวมการฝึกพัฒนาเว็บตั้งแต่ HTML และ CSS ไปจนถึง JavaScript, DOM,
การเชื่อมต่อ API และเว็บแอปพลิเคชันด้วย React

แต่ละโฟลเดอร์เป็นงานแยกกัน ใช้สำหรับทบทวนเนื้อหา ทดลองโค้ด
และติดตามพัฒนาการตลอดรายวิชา

## หัวข้อที่ฝึกในรายวิชา

| หัวข้อ | สิ่งที่ได้ฝึก |
| --- | --- |
| HTML และ CSS | โครงสร้างหน้าเว็บ ข้อความ รูปภาพ ตาราง ฟอร์ม และการจัดวางองค์ประกอบ |
| JavaScript | ตัวแปร เงื่อนไข ลูป ฟังก์ชัน Array และ Object |
| DOM และ Event Handling | เลือกและเปลี่ยนแปลง Element รับ input จัดการ event และตรวจสอบฟอร์ม |
| การจัดการข้อมูล | ค้นหา กรอง เรียงลำดับ คำนวณข้อมูลสรุป และใช้ `localStorage` |
| API และ Asynchronous JavaScript | เรียกข้อมูลด้วย Fetch API, `async/await` และจัดการ Loading/Error |
| React | แยก Component จัดการ State ใช้ Hooks และเปลี่ยนหน้าด้วย React Router |
| UI และการประยุกต์ | Responsive Layout, Tailwind CSS, DaisyUI, CRUD และ Dashboard |

## สารบัญงาน

| โฟลเดอร์ | งาน | เนื้อหาหลัก | จุดเริ่มต้น |
| --- | --- | --- | --- |
| [Lab1](./Lab1/) | หน้าแนะนำตัว | HTML, CSS, รูปภาพ ลิงก์ และตาราง | [index.html](./Lab1/index.html) |
| [js_lab](./js_lab/) | JavaScript Fundamental Lab | เงื่อนไข ลูป ฟังก์ชัน และการจัดการ Array/Object | [test.html](./js_lab/test.html) |
| [DOM and Evetn Handling](./DOM%20and%20Evetn%20Handling/) | ฟอร์มลงทะเบียนสมาชิก | DOM, Event Handling, การแสดงตัวอย่างข้อมูล และ Validation | [testJS.html](./DOM%20and%20Evetn%20Handling/testJS.html) |
| [test](./test/) | ระบบบันทึกคะแนนและตัดเกรด | Form Submit, เงื่อนไข และการแสดงผลผ่าน DOM | [index.html](./test/index.html) |
| [weather-dashboard](./weather-dashboard/) | Weather Dashboard | ค้นหาเมือง เรียก Open-Meteo API และแสดงสภาพอากาศ/พยากรณ์ | [index.html](./weather-dashboard/index.html) |
| [67050176_midterm](./67050176_midterm/) | Smart Event Hub — งานกลางภาค | จัดการกิจกรรม ค้นหา กรอง เรียงลำดับ และเก็บข้อมูลในเครื่อง | [index.html](./67050176_midterm/index.html) |
| [minishop-dashboard](./minishop-dashboard/) | MiniShop React — แบบฝึกหัด | React Router, REST API CRUD และ Admin Dashboard สำหรับ Lab9–11 | [คู่มือโปรเจกต์](./minishop-dashboard/README.md) |
| [finalWeb0176](./finalWeb0176/) | MiniShop Dashboard — งานปลายภาค | หน้าร้าน ตะกร้า โปรไฟล์ การจัดการสินค้า และสรุปข้อมูลด้วย React | [คู่มือโปรเจกต์](./finalWeb0176/minishop-dashboard/README.md) |

## วิธีเปิดใช้งาน

### งาน HTML, CSS และ JavaScript

งานใน `Lab1`, `js_lab`, `DOM and Evetn Handling`, `test`,
`weather-dashboard` และ `67050176_midterm` เปิดผ่านไฟล์ HTML
ที่ระบุในตารางได้ หรือใช้ Live Server ใน Visual Studio Code
โดยเก็บไฟล์ CSS, JavaScript และรูปภาพไว้ตามโครงสร้างเดิม

สำหรับ `js_lab` ให้เปิด Developer Tools → Console เพื่อดูผลลัพธ์
ตัวอย่างหลายส่วนใน `app.js` ถูกคอมเมนต์ไว้ สามารถเปิดเฉพาะส่วนที่ต้องการทดลอง
งานที่เรียก API เช่น Weather Dashboard ต้องเชื่อมต่ออินเทอร์เน็ต

### งาน React และ Vite

ใช้ Node.js `^20.19.0` หรือ `>=22.12.0` พร้อม npm
เลือกเข้าโฟลเดอร์ของงานจากตำแหน่งราก `webPro`:

| งาน | คำสั่งเข้าโฟลเดอร์ |
| --- | --- |
| แบบฝึกหัด MiniShop | `cd .\minishop-dashboard` |
| งานปลายภาค | `cd .\finalWeb0176\minishop-dashboard` |

จากนั้นรัน:

```powershell
npm ci
npm run dev
```

เปิด URL ที่ Vite แสดงใน Terminal และใช้คำสั่งต่อไปนี้เพื่อตรวจผล build:

```powershell
npm run build
npm run preview
```

แบบฝึกหัด MiniShop ต้องเปิด `npm run api` ใน Terminal อีกหน้าหนึ่ง
ภายในโฟลเดอร์เดียวกัน เพื่อรัน JSON Server ที่พอร์ต 3001
ส่วนงานปลายภาคเรียก Public API โดยตรง รายละเอียดเพิ่มเติมอยู่ในคู่มือของแต่ละงาน

> [!IMPORTANT]
> โฟลเดอร์ราก `webPro` ไม่มี `package.json` หรือคำสั่ง npm กลาง
> ต้องเข้าโฟลเดอร์โปรเจกต์ที่ต้องการก่อนรันคำสั่ง npm

## เครื่องมือและเทคโนโลยี

- **พื้นฐานเว็บ:** HTML5, CSS และ JavaScript
- **ส่วนติดต่อผู้ใช้:** React, React Router, Tailwind CSS และ DaisyUI
- **เครื่องมือพัฒนา:** Vite, Node.js และ npm
- **แหล่งข้อมูล:** Fetch API, Open-Meteo, Fake Store API และ JSON Server
- **การจัดการข้อมูลในหน้าเว็บ:** React State และ `localStorage` ตามลักษณะของแต่ละงาน

## การจัดเก็บไฟล์

- Source code และ `package-lock.json` เก็บใน Git เพื่อเปิดและติดตั้งแต่ละงานซ้ำได้
- `node_modules/` และ `dist/` สร้างใหม่จากคำสั่งติดตั้งและ build จึงไม่เก็บใน Git
- `Document/` ใช้เก็บใบงานและเอกสารอ้างอิงในเครื่อง และถูกยกเว้นด้วย `.gitignore`
- ไฟล์ ZIP ส่งงานเก็บแยกในเครื่อง โดยยกเว้นชื่อไฟล์ส่งงานไว้ใน `.gitignore`

> [!NOTE]
> แต่ละงานใช้วิธีเก็บข้อมูลต่างกัน เช่น State, `localStorage` หรือ JSON Server
> การคงข้อมูลหลังรีเฟรชจึงขึ้นอยู่กับการออกแบบของงานนั้น

## ผู้จัดทำ

**ณิชาพร อุทธยาน** · รหัสนักศึกษา **67050176**
