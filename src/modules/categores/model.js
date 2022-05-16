import {fetch, fetchAll} from '#pg'
import { pagination as dp } from '#config'

const CATEGORES =`
    select 
        category_id,
        categoryname,
        TO_CHAR(category_created_at, 'YYYY-MM-DD hh:mm:ss') category_created_at
    from categories 
    where
    case 
        when $3 > 0 then category_id = $3
        else true
    end and
    case 
        when length($4) > 3 then (
            categoryname ilike concat('%', $4, '%')
        )else true
    end 
    offset $1 limit $2
` 

const ADD_CATEGORY =`
    insert into categories (categoryname) values ($1)
    returning categoryname
`

const DELETE_CATEGORY =`
    delete from categories cascade
    where categoryname ilike $1
    returning categoryname
`



function categories(pagination, category_id, search){

    const page = pagination.page || dp.page
	const limit = pagination.limit || dp.limit

    return fetchAll(CATEGORES, (page -1) * limit, limit, category_id, search)
}

function addCategory ({categoryname}) {
    return fetchAll(ADD_CATEGORY, categoryname)
}

const deleteCategory = ({categoryname}) => {
    return fetchAll(DELETE_CATEGORY, categoryname)
}




export default{
    deleteCategory,
    addCategory,
    categories,
}