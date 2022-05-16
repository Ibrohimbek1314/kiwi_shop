import queryParser from './utils/queryParser.js'
import jwt from '#jwt'

export default ({ req }) => {
	try {
		let { operation, fieldName, variables } = queryParser(req.body)

		if(fieldName == '__schema') return
	
		/* public queries */
		if(
			[
				'login',
				'products',
				'register',
				'categories',
			].includes(fieldName)
		) {
			return {
				agent: req.headers['user-agent']
			}
		}

		if(
			fieldName == 'addProduct' || fieldName == 'addCategory' ||
			fieldName == 'deleteCategory'|| fieldName == 'restoreUser' ||
			fieldName == 'changeCategory' || fieldName == "orders" 
		) {
			let {token} = req.headers
			let {user_id , agent} = jwt.verify(token)
			return{
				user_id
			}
		}
	
		/* private routes */
		const token = req.headers.token

		if(!token) {
			throw new Error("Token is required!")
		}

		const { agent, user: { user_id, is_admin } } = jwt.verify(token)

		if(agent != req.headers['user-agent']) {
			throw new Error("The user has requested from wrong device!")
		}

		// queries for admin and users
		if(
			[
				'users',
				'deleteUser',
				'changeUser',
				'addOrder'
			].includes(fieldName)
		) {
			return {
				agent: req.headers['user-agent'],
				userId: user_id,
				role: is_admin ? 'admin' : 'user'
			}
		}

		// queries for only admins
		if(
			[
				'deletedUsers',
			].includes(fieldName) && is_admin
		) {
			return {
				agent: req.headers['user-agent'],
				userId: user_id,
				role: is_admin ? 'admin' : 'user'
			}
		} else {
			throw new Error("You are not allowed")
		}
	
	} catch(error) {
		throw error
	}
}
