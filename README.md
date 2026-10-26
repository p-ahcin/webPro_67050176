# webPro_67050176

คลังโปรเจกต์และแบบฝึกหัดรายวิชา Web Programming รหัสนักศึกษา **67050176**
รวมงาน HTML, CSS, JavaScript และ React โดยแต่ละโฟลเดอร์เป็นงานแยกกัน

## โปรเจกต์และแบบฝึกหัด

| โฟลเดอร์ | เนื้อหา |
| --- | --- |
| [finalWeb0176](./finalWeb0176/minishop-dashboard/) | MiniShop Dashboard งานปลายภาค |
| [minishop-dashboard](./minishop-dashboard/) | MiniShop React: Routing, REST API CRUD และ Admin Dashboard สำหรับ Lab9–11 |
| [weather-dashboard](./weather-dashboard/) | เว็บแสดงข้อมูลสภาพอากาศ |
| [67050176_midterm](./67050176_midterm/) | Smart Event Hub งานกลางภาค |
| [Lab1](./Lab1/) | แบบฝึกหัด HTML และ CSS |
| [js_lab](./js_lab/) | แบบฝึกหัด JavaScript |
| [DOM and Evetn Handling](./DOM%20and%20Evetn%20Handling/) | แบบฝึกหัด DOM และ Event Handling |
| [test](./test/) | ระบบบันทึกคะแนนและตัดเกรด |

## งานปลายภาค — MiniShop Dashboard

พัฒนาด้วย React, Vite, React Router, Tailwind CSS และ DaisyUI
ใช้ Fake Store API พร้อมข้อมูลสำรอง รองรับ Responsive Layout และ Light/Dark Mode

ต้องมี Node.js `^20.19.0` หรือ `>=22.12.0` และ npm
จากโฟลเดอร์ราก `webPro` ให้รัน:

```powershell
cd .\finalWeb0176\minishop-dashboard
npm ci
npm run dev
```

เปิด URL ที่ Vite แสดง โดยทั่วไปคือ [http://localhost:5173](http://localhost:5173)
ใช้เพียง Terminal เดียว เนื่องจากแอปเรียก Public API โดยตรง

| หน้า | เส้นทาง |
| --- | --- |
| หน้าหลัก | `/` |
| ค้นหาและเลือกซื้อสินค้า | `/products` |
| รายละเอียดสินค้า | `/products/:id` |
| ตะกร้าสินค้า | `/cart` |
| โปรไฟล์และประวัติคำสั่งซื้อ | `/profile` |
| สถิติและคำสั่งซื้อของร้าน | `/admin/dashboard` |
| เพิ่ม แก้ไข และลบสินค้า | `/admin/products` |
| เกี่ยวกับแอป | `/about` |

ตรวจผล build โดยรันในโฟลเดอร์เดียวกัน:

```powershell
npm run build
npm run preview
```

รายละเอียดการใช้ข้อมูลและวิธีตรวจสอบอยู่ใน
[README ของงานปลายภาค](./finalWeb0176/minishop-dashboard/README.md)

> [!NOTE]
> ข้อมูลสินค้า ตะกร้า โปรไฟล์ และคำสั่งซื้อของงานปลายภาคเก็บใน React State
> และเริ่มใหม่เมื่อรีเฟรช การสั่งซื้อเป็นการจำลอง ส่วนค่าธีมเก็บใน `localStorage`

## แบบฝึกหัด MiniShop — Lab9–11

โปรเจกต์นี้ใช้ JSON Server สำหรับ REST API
จากโฟลเดอร์ราก `webPro` ให้รัน:

```powershell
cd .\minishop-dashboard
npm ci
```

เปิดสอง Terminal โดยทั้งคู่ต้องอยู่ใน `webPro/minishop-dashboard`:

```powershell
# Terminal 1: Mock REST API
npm run api
```

```powershell
# Terminal 2: React / Vite
npm run dev
```

เปิด URL ที่ Vite แสดง และตรวจ API ได้ที่
[http://localhost:3001/products](http://localhost:3001/products)

รายละเอียดอยู่ใน [README ของแบบฝึกหัด MiniShop](./minishop-dashboard/README.md)

## การจัดเก็บไฟล์

> [!IMPORTANT]
> Repository นี้ไม่มีคำสั่ง npm กลาง ให้เข้าโฟลเดอร์ที่มี `package.json`
> ของโปรเจกต์ที่ต้องการก่อนรัน `npm ci` หรือ `npm run dev`

- `Document/` เก็บใบงานและเอกสารในเครื่อง โดยยกเว้นจาก Git
- `node_modules/` และ `dist/` สร้างใหม่ได้จากคำสั่งติดตั้งและ build จึงยกเว้นจาก Git
- เก็บ `package-lock.json` เพื่อให้ติดตั้ง dependencies ได้ตรงกันด้วย `npm ci`
- ZIP ส่งงานเก็บไว้ในเครื่อง และยกเว้นจาก Git ตาม `.gitignore`

## ผู้จัดทำ

ณิชาพร อุทธยาน · รหัสนักศึกษา **67050176**
