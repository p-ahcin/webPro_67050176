export default function About() {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-800">
        About MiniShop
      </h1>

      <p className="mt-4 text-slate-600">
        MiniShop เป็นร้านค้าตัวอย่างสำหรับฝึกพัฒนาเว็บแอปพลิเคชัน
        ด้วย React และ Tailwind CSS
      </p>

      <h2 className="mt-6 text-xl font-semibold text-slate-800">
        วัตถุประสงค์
      </h2>

      <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-600">
        <li>ฝึกแบ่งหน้าจอเป็น Component และส่งข้อมูลผ่าน Props</li>
        <li>ฝึกจัดการเส้นทางด้วย React Router</li>
        <li>ฝึกแยกข้อมูลสินค้าออกจากส่วนแสดงผล</li>
      </ul>

      <button className="btn btn-primary mt-4">
        DaisyUI Working
      </button>
    </section>
  )
}