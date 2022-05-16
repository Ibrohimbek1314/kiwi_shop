import { GraphQLUpload } from "graphql-upload"
import { finished } from "stream"
import model from "./model.js"
import path from "path";
import fs from "fs";


export default{
    Query: {
        products: async (_, product , context) => {
            try {
                const products = model.products({ ...product}, context)
                return await products
            } catch(error) {
                console.log(error.message);
            }
        },
    },

    Upload: GraphQLUpload,
    
    Mutation: {
        addProduct: async(_, args) => {
                args["pagination"] = {page: 1, limit: 5}
                args["search"] = args.productName
                const produc = await model.products(args)
                if(produc.length > 0)
                    throw new Error(
                        "You must check 'productname'! It's duplicate found!"
                    )
                
                let { createReadStream, filename, mimetype } = await args.file
                if (
                    mimetype.split("/")[0] == "image" &&
                    ["jpeg", "tiff", "png"].includes(mimetype.split("/")[1])
                )
                    mimetype = "image/jpg"

                const stream = createReadStream()
                const fileAddress = path.join(
                    process.cwd(),
                    'src',
                    'modules',
                    'uploads',
                    filename.replace(/\s/g, "")
                )
                const out = fs.createWriteStream(fileAddress)
                stream.pipe(out)

                finished(out, (err) => err)

                args['picture'] = filename.replace(/\s/g, "");

                const product = await model.addProduct(args)
                if (product){
                    console.log(product);
                } else throw new Error("There is no such product!")
            
            
        },
    },



    Products: {
        productId: (global) => global.product_id,
        productName: (global) => global.product_name,
        productImg: (global) => global.product_img,
        productPrice: (global) => global.product_price,
        productShortDescription: (global) => global.product_short_description,
        productLongDescription: (global) => global.product_long_description,
        productCreatedAt: (global) => global.product_created_at,
    }

}


