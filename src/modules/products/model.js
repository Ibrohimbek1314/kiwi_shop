import {fetch, fetchAll} from '#pg'
import { pagination as dp } from '#config'

const CHACK_USER=`
    select
        username,
        is_admin
    from users
    where username ilike $1
`



const PRODUCTS =`
    select 
        product_id,
        product_name,
        product_img,
        product_price,
        product_short_description,
        product_long_description,
        categoryname,
        TO_CHAR(product_created_at, 'YYYY-MM-DD hh:mm:ss') product_created_at
    from products
    where
    case
		WHEN $1 > 0 THEN product_id = $1
		else true
	end and
	case
		WHEN LENGTH($2) > 0 THEN (
			product_name ilike concat('%', $2, '%')
		) else true
	end
	ORDER BY product_id
    offset $3 limit $4
   
`

const ADD_PRODUCT =`
insert into products (product_name, categoryname, product_price, product_img, product_short_description, product_long_description)
    values ($1, $2, $3, $4, $5, $6)
returning *
`

async function addProduct({
    product_name,
    categoryname,
    product_price,
    product_img,
    product_short_description,
    product_long_description
}){

    return fetchAll(
        ADD_PRODUCT,
        product_name,
        categoryname,
        product_price,
        product_img,
        product_short_description,
        product_long_description
  );
}


function products({ pagination, search, product_id }) {
        const page = pagination.page || dp.page
	    const limit = pagination.limit || dp.limit
    return fetchAll(PRODUCTS, product_id, search, (page - 1) * limit, limit);
  }

export default{ 
    products,
    addProduct
}