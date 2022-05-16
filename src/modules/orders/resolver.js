import orders from './index.js'
import model from './model.js'


export default{ 
    Query: {
        orders: async (_, args, context) => {
            try{
                const order = model.orders(...args, context)
                
                if(order){
                    return{
                        status: 200,
                        message: 'oxshadi manimcha',
                        data: order
                    }
                }else throw new Error('chota nimdur xato')

            }catch(error){  
                console.log(error.message);
            }
        }
    },

    Mutation: {
        addOrder: async(_, args) => {
            console.log(args, '1');
            try{
                const order = await model.addOrder(args)
                console.log(await order);
                if(order){
                    console.log(order);                    
                }else throw new Error ('There is no such order!')
            }catch(error){
                return {
                    status: 400,
                    message: error.message
                }
            }
        }
    },

    Order: {
        orderId: global => global.order_id,
        userId: global => global.user_id,
        isPaid: global => global.is_paid,
        orderCreatedAt: global => global.order_created_at,
    }
}