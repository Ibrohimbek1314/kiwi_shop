import {fetch, fetchAll} from '#pg'
import { pagination as dp } from '#config'


const ORDER  =`
    select 
        order_id,
        user_id,
        is_paid,
        product_id,
        totalprice,
        count,
        TO_CHAR(order_created_at, 'YYYY-MM-DD hh:mm:ss') order_created_at
    from orders
`

const ADD_ORDER =` 
    insert into orders(product_id, count ) 
        values($1, $2) 
    returning product_id, count
`


const orders = () => {
    return fetchAll(ORDER)
} 

const addOrder = ({product_id, count }) => {
    return fetchAll(ADD_ORDER, product_id, count )
}

export default{
    addOrder,
    orders,
}