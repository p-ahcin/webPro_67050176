import { useState } from 'react'
import { useShop } from '../context/ShopContext.jsx'
import OrderList from '../components/OrderList.jsx'

export default function Profile() {
  const { profile, setProfile } = useShop()
  const [form, setForm] = useState(profile)
  const [message, setMessage] = useState('')
  function save(event) {
    event.preventDefault()
    if (!form.name.trim()) {
      setMessage('กรุณากรอกชื่อ')
      return
    }
    setProfile({
      name: form.name.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
    })
    setMessage('บันทึกโปรไฟล์แล้ว')
  }
  return (
    <>
      <h1 className="text-3xl font-bold">My Profile</h1>
      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <section className="panel space-y-3">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full
              bg-primary/10 text-2xl font-bold text-primary`}
          >
            {profile.name.slice(0, 1)}
          </div>
          <h2 className="text-xl font-bold">{profile.name}</h2>
          <p>รหัสนักศึกษา 67050176</p>
          <p className="break-words">{profile.email || 'ยังไม่ระบุอีเมล'}</p>
          <p className="break-words opacity-65">
            {profile.address || 'ยังไม่ระบุที่อยู่'}
          </p>
        </section>
        <form onSubmit={save} className="panel grid gap-4">
          <h2 className="text-xl font-bold">แก้ไขโปรไฟล์</h2>
          {[
            ['name', 'ชื่อ–นามสกุล'],
            ['email', 'อีเมล'],
            ['address', 'ที่อยู่'],
          ].map(([name, label]) => (
            <label key={name} className="grid gap-2">
              {label}
              <input
                className="input w-full"
                type={name === 'email' ? 'email' : 'text'}
                name={name}
                value={form[name]}
                onChange={(event) =>
                  setForm((current) => ({ ...current, [name]: event.target.value }))
                }
              />
            </label>
          ))}
          <button className="btn btn-primary justify-self-start">บันทึกโปรไฟล์</button>
          {message && <p role="status">{message}</p>}
        </form>
      </div>
      <section className="panel">
        <h2 className="text-xl font-bold">ประวัติคำสั่งซื้อ</h2>
        <OrderList />
      </section>
    </>
  )
}
