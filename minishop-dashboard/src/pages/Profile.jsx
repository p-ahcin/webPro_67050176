export default function Profile() {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-800">
        My Profile
      </h1>

      <dl className="mt-6 space-y-4">
        <div>
          <dt className="text-sm text-slate-500">ชื่อ–นามสกุล</dt>
          <dd className="font-semibold text-slate-800">
            ณิชาพร อุทธยาน
          </dd>
        </div>

        <div>
          <dt className="text-sm text-slate-500">รหัสนักศึกษา</dt>
          <dd className="font-semibold text-slate-800">
            67050176
          </dd>
        </div>

        <div>
          <dt className="text-sm text-slate-500">เกี่ยวกับฉัน</dt>
          <dd className="text-slate-700">
            นักศึกษาคณะวิทยาศาสตร์ สาขาวิทยาการคอมพวิเตอร์ ชั้นปีที่ 3
          </dd>
        </div>
      </dl>
    </section>
  )
}