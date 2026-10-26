import { money, useShop } from '../context/ShopContext.jsx'

export default function OrderList() {
  const { orders } = useShop()
  if (!orders.length)
    return (
      <p className="py-4 opacity-65">
        ยังไม่มีคำสั่งซื้อ ทดลองสั่งซื้อจากตะกร้าสินค้า
      </p>
    )
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>คำสั่งซื้อ</th>
            <th>วันที่</th>
            <th>รายการ</th>
            <th>ยอดรวม</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{new Date(order.date).toLocaleString('th-TH')}</td>
              <td>
                {order.items.map((item) => `${item.name} × ${item.quantity}`).join(', ')}
              </td>
              <td>{money(order.total)}</td>
              <td>
                <span className="badge badge-info">สำเร็จ</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
