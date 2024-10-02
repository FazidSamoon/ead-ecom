import OrderManagementStats from '../../components/molecules/orderManagementStats/OrderManagementStats'
import OrderManagementTable from '../../components/molecules/orderManagementTable/OrderManagementTable'

const OrderHome = () => {
  return (
    <div>
        <OrderManagementStats />
        <OrderManagementTable />
    </div>
  )
}

export default OrderHome