<img src="./public/favicon.svg" alt="ไอคอนแอป" width="48" />

# MiniShop React

เว็บร้านค้าตัวอย่างและหน้าจัดการสินค้า พัฒนาต่อจาก Week 6–8 สำหรับ Lab9–11 ด้วย React, Vite, React Router v6, Tailwind CSS v4, DaisyUI และ JSON Server 0.17.4

[กลับหน้ารวมงาน](../README.md)

## ความสามารถ

| ใบงาน | ส่วนที่พัฒนา |
| --- | --- |
| Lab9 | หน้า Home, About, Products, Product Detail, Profile และ Not Found พร้อม Layout ร่วมและ Navigation |
| Lab10 | อ่าน เพิ่ม แก้ไข และลบสินค้าผ่าน REST API พร้อม Validation และ Loading / Error / Empty State |
| Lab11 | Admin Layout, Summary Cards จาก API, ตารางพร้อม Badge หมวดหมู่, Modal เพิ่ม/แก้ไข และ Light/Dark Mode ที่จำค่าหลังรีเฟรช |

หน้า Admin รองรับการจัดวางบนมือถือ แท็บเล็ต และเดสก์ท็อป มีการยืนยันก่อนลบ และปิด Modal ด้วย Cancel หรือ Esc ได้เมื่อไม่ได้กำลังบันทึก

## เริ่มใช้งาน

ใช้ Node.js ที่ตรงกับ Vite ในโปรเจกต์: `^20.19.0` หรือ `>=22.12.0` พร้อม npm

จากโฟลเดอร์รากของ repository:

```powershell
cd minishop-dashboard
npm ci
```

เปิดสอง Terminal โดยทั้งคู่ต้องอยู่ในโฟลเดอร์ `minishop-dashboard`

**Terminal 1 — JSON Server**

```powershell
npm run api
```

ตรวจข้อมูลที่ [http://localhost:3001/products](http://localhost:3001/products)

**Terminal 2 — React / Vite**

```powershell
npm run dev
```

เปิด URL ที่ Vite แสดง โดยทั่วไปคือ [http://localhost:5173](http://localhost:5173) หากพอร์ตถูกใช้งาน Vite อาจเลือกพอร์ตอื่น ให้ใช้พอร์ตที่ Terminal แสดงแทน

| คำสั่ง | หน้าที่ |
| --- | --- |
| `npm run dev` | เปิดเซิร์ฟเวอร์พัฒนา Frontend |
| `npm run api` | เปิด Mock API ที่พอร์ต 3001 และบันทึกข้อมูลใน `db.json` |
| `npm run build` | สร้างไฟล์ production ใน `dist/` |
| `npm run preview` | เปิดดูผล build ในเครื่อง โดยต้อง build ก่อน และยังต้องรัน API สำหรับหน้า Admin |

## หน้าและเส้นทาง

| URL path | หน้า |
| --- | --- |
| `/` | Home พร้อมสินค้าแนะนำ 2 รายการ |
| `/about` | ข้อมูลและวัตถุประสงค์ของร้าน |
| `/products` | รายการสินค้าจาก Model ในเครื่อง |
| `/products/:id` | รายละเอียดตาม ID; หากไม่มีสินค้า แสดง Product not found |
| `/profile` | ข้อมูลผู้จัดทำ |
| `/admin` | เปลี่ยนเส้นทางไป `/admin/dashboard` |
| `/admin/dashboard` | จำนวนสินค้า ผลรวมราคาสินค้า จำนวนหมวดหมู่ และตารางภาพรวม |
| `/admin/products` | จัดการสินค้า CRUD ผ่าน Modal |
| URL อื่น | หน้า 404 Not Found |

เข้าหน้า Admin ได้โดยเปิด URL โดยตรง ส่วนเมนูภายใน Admin ใช้สลับระหว่าง Dashboard และ Products และมีปุ่ม Back to Shop

## แหล่งข้อมูล

| ส่วนของแอป | แหล่งข้อมูล |
| --- | --- |
| หน้าร้าน Lab9 | `src/models/productModel.js` ใช้ข้อมูลจาก `src/sampleProducts.js` และรูปใน `src/assets/` พร้อม ID ตัวเลข 1–4 |
| Admin Lab10–11 | `src/service/productApi.js` เรียก `http://localhost:3001/products` ซึ่งอ่านและเขียน `db.json` |

> [!NOTE]
> ข้อมูลสองชุดแยกกัน การเพิ่ม แก้ไข หรือลบสินค้าใน Admin จะไม่เปลี่ยนรายการในหน้าร้าน Lab9 ส่วน Product Value เป็นผลรวมราคาต่อรายการ ไม่ใช่ยอดขายหรือมูลค่าสินค้าคงคลังตามจำนวนสต็อก

งานเดิมที่เรียก Fake Store API พร้อมค้นหาและตะกร้าเก็บไว้ในไฟล์สำรอง `src/App-week6-8.jsx` หากมีไฟล์นี้ในเครื่อง แต่ไม่ได้ถูกเรียกโดย `src/main.jsx` ปัจจุบัน

## REST API

ใช้ `fetch()` และตรวจ `response.ok` ใน API Service ก่อนอ่าน JSON ฟิลด์สินค้าได้แก่ `id`, `title`, `price`, `category` และ `description`

| Method | Endpoint | การทำงาน |
| --- | --- | --- |
| GET | `/products` | อ่านสินค้าทั้งหมด |
| GET | `/products/:id` | อ่านสินค้าหนึ่งรายการ เช่น `/products/1` |
| POST | `/products` | เพิ่มสินค้า โดยให้เซิร์ฟเวอร์สร้าง ID |
| PUT | `/products/:id` | แทนที่ข้อมูลสินค้าตาม ID |
| DELETE | `/products/:id` | ลบสินค้าตาม ID |

ตัวอย่างเพิ่มสินค้า: ส่ง `POST /products` พร้อม Header `Content-Type: application/json` และ Body:

```json
{
  "title": "Mouse",
  "price": 450,
  "category": "Computer",
  "description": "Wireless mouse"
}
```

เมื่อสำเร็จ JSON Server ตอบ `201 Created` พร้อมข้อมูลสินค้าและ ID ที่สร้างให้ จากนั้นแอปโหลดรายการใหม่ด้วย GET ฟอร์มจะไม่ส่งข้อมูลหากชื่อว่าง หรือราคาไม่ใช่ตัวเลขที่มีค่าจำกัดและมากกว่า 0

> [!IMPORTANT]
> การทำ CRUD เปลี่ยนข้อมูลใน `db.json` จริงและข้อมูลยังอยู่หลังรีเฟรช ควรสำรองไฟล์ก่อนทดลอง JSON Server เป็น Mock API สำหรับใบงาน โดยไฟล์ `db.before-lab11.json` หากมี เป็นข้อมูลสำรอง ไม่ใช่ไฟล์ที่คำสั่ง `npm run api` ใช้งาน

## โครงสร้างหลัก

```text
minishop-dashboard/
├── public/                 # ไอคอนและไฟล์ static
├── src/
│   ├── assets/             # รูปสินค้าตัวอย่าง
│   ├── components/         # Layout, Navbar, AdminLayout, ThemeToggle และส่วน UI
│   ├── models/             # ข้อมูลและการค้นหาสินค้าของ Lab9
│   ├── pages/              # หน้าร้าน, Dashboard และ ProductManagement
│   ├── service/            # ฟังก์ชันเรียก REST API
│   ├── sampleProducts.js   # สินค้าตัวอย่าง 4 รายการ
│   ├── App.jsx            # กำหนด Routes
│   ├── main.jsx           # จุดเริ่มต้นและ BrowserRouter
│   └── style.css          # Tailwind CSS และ DaisyUI themes
├── db.json                # ข้อมูลของ JSON Server
├── package.json           # Dependencies และคำสั่งรัน
├── package-lock.json      # ล็อกเวอร์ชัน dependencies
└── vite.config.js         # React และ Tailwind plugins
```

## ตรวจสอบก่อนส่งงาน

1. เปิดหน้าร้านทุกหน้า รวม `/products/999` และ URL ที่ไม่มี Route
2. เพิ่ม Mouse ราคา 450 แก้เป็น 490 แล้วลบ โดยตรวจทั้งตารางและ API; เก็บภาพ CRUD ทั้ง 4 Operation สำหรับ Lab10
3. ตรวจชื่อว่าง ราคา 0 และราคาติดลบ ทั้งโหมดเพิ่มและแก้ไข ต้องมีข้อความเตือนและไม่บันทึก
4. ตรวจ Cancel / Esc ของ Modal และการยกเลิกคำยืนยันลบ ต้องไม่เปลี่ยนข้อมูล
5. กลับ Dashboard หลัง CRUD แล้วตรวจ Summary Cards ให้ตรงกับ API
6. สลับ Light/Dark Mode และรีเฟรช ธีมต้องคงเดิม โดยบันทึกด้วยคีย์ `minishop-theme` ใน `localStorage`
7. ทดสอบหน้าจอกว้าง 375, 768 และ 1440 พิกเซล รวมตารางเลื่อนแนวนอนและ Modal ที่เลื่อนได้
8. ตรวจ Loading / Error / Empty State และรัน `npm run build`

หากหน้า Admin โหลดไม่ได้ ให้ตรวจว่า JSON Server ยังทำงานและเปิด `/products` ที่พอร์ต 3001 ได้ แล้วกด Try Again หรือ Retry ส่วนการ deploy ไปยัง static hosting ต้องจัดเตรียม API และการรองรับเส้นทาง BrowserRouter เพิ่มต่างหาก
