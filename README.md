# webPro_67050176

คลังงานและแบบฝึกหัดวิชาพัฒนาเว็บ รหัสนักศึกษา 67050176 รวมงาน HTML, CSS, JavaScript และ React โดยแต่ละโฟลเดอร์เป็นงานแยกกัน

## โปรเจกต์และแบบฝึกหัด

| โฟลเดอร์ | เนื้อหา |
| --- | --- |
| [minishop-dashboard](./minishop-dashboard/) | MiniShop React: Routing, REST API CRUD และ Admin Dashboard สำหรับ Lab9–11 |
| [weather-dashboard](./weather-dashboard/) | เว็บแสดงข้อมูลสภาพอากาศ |
| [67050176_midterm](./67050176_midterm/) | Smart Event Hub งานกลางภาค |
| [Lab1](./Lab1/) | แบบฝึกหัด HTML และ CSS |
| [js_lab](./js_lab/) | แบบฝึกหัด JavaScript |
| [DOM and Evetn Handling](./DOM%20and%20Evetn%20Handling/) | แบบฝึกหัด DOM และ Event Handling |
| [test](./test/) | ระบบบันทึกคะแนนและตัดเกรด |

## เริ่มใช้งาน MiniShop

ต้องมี Node.js และ npm ตามข้อกำหนดใน [คู่มือ MiniShop](./minishop-dashboard/README.md)

จากโฟลเดอร์รากของ repository:

```powershell
cd minishop-dashboard
npm ci
```

เปิดสอง Terminal ภายในโฟลเดอร์ `minishop-dashboard`:

```powershell
# Terminal 1: Mock REST API
npm run api
```

```powershell
# Terminal 2: React / Vite
npm run dev
```

เปิด URL ที่ Vite แสดง โดยทั่วไปคือ [หน้าร้าน](http://localhost:5173/) และ [Admin Dashboard](http://localhost:5173/admin/dashboard)

รายละเอียดโครงสร้าง เส้นทาง API และวิธีทดสอบอยู่ใน [README ของ MiniShop](./minishop-dashboard/README.md)

> [!NOTE]
> Repository นี้ไม่มีคำสั่ง npm กลาง ให้รันคำสั่งภายในโฟลเดอร์โปรเจกต์ที่ต้องการ ส่วนโฟลเดอร์ `Document` เก็บใบงานในเครื่องและถูกยกเว้นด้วย `.gitignore`
