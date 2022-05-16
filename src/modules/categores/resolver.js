import context from '../../context.js';
import model from './model.js'


export default{

    Mutation: {
        addCategory: async(_, args, context) => {
            
                const categories = await model.addCategory(args, context)

                if(categories) {
                    return{ 
                        status: 200,
                        message: 'category added!',
                        data: categories,
                    }
                }else throw new Error ('There is no such category!')
            
        },

        deleteCategory: async (_, args, context) => {
            try{
                const categories = await model.deleteCategory(context)
                if(categories){
                    return {
                        status: 200, 
                        message: 'The category deleted',
                        data: categories
                    }
                }else throw new Error('The category already deleted or not exists')
            }catch(error){  
                return {
                    status: 401,
                    message: error.message,
                }
            }
        },

        
    },

    Query:{
        categories: async(_, args) => {
            try{
                const categories = model.categories(args)
                return await categories
            }catch(error){
                throw error.message
            }
        }
    },


    Categories: {
        categoreId: global => global.category_id,
        categoryCreatedAt: global => global.category_created_at
    }
}