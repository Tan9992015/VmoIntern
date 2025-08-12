import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { Like, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { ProductAllOptional, ProductDto } from "./product.dto";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { CategoryEntity } from "src/category/category.entity";

@Injectable()
export class ProductService {
    constructor(@InjectRepository(ProductEntity) 
                private readonly productRepository: Repository<ProductEntity>,
                @InjectRepository(CategoryEntity)
                private readonly categoryRepository:Repository<CategoryEntity>
            ) { }
    
        async create(product:ProductDto):Promise<any> {
            try {
                let newProduct = new ProductEntity()
                newProduct.description = product.description ?? ''
                newProduct.name = product.name ?? ''
                newProduct.price = product.price ?? 0
                newProduct.stock = product.stock ?? 0
                newProduct.image = product.image ?? ''
                const category = await this.categoryRepository.findOne({where:{id:product.categoryId}})
                if(!category) return {
                    err:1,
                    mess:'category not found'
                }
                newProduct.category = category
                // save product to db
                const savedUser = await this.productRepository.save(newProduct)
                if(!savedUser) return {
                    error:1,
                    mess:'can not save prodct'
                }
                return {
                    erro:0,
                    mess:'create product success',
                }
            } catch (error) {
                throw new Error(error)
            }
        }

        async updateProductById(id:string,product:ProductAllOptional):Promise<any> {
            try {
                const foundProduct = await this.productRepository.findOne({where:{id}})
                if(!foundProduct) return {
                    err: 1,
                    mess:'product not found'
                }
                const updatedProduct = await this.productRepository.update(foundProduct.id,product) 
                if(!updatedProduct) return {
                    err:1,
                    mess:'product updated fail'
                }
                return {
                    err:0,
                    mess:'product updated success'
                }
            } catch (error) {
                throw new Error(error)
            }
        }


        async findAllProduct():Promise<ProductEntity[]> {
            return await this.productRepository.find()
        }

        async findOneById(id:string):Promise<any> {
            const foundProduct = await this.productRepository.findOne({where: {id},relations:['category']})
            if(!foundProduct) return {
                err:1,
                mess:'product not found'
            }
            return {
                err:0,
                mess:'found product success',
                product:foundProduct
            }
        }

        async deleteProduct(id:string):Promise<any> {
            return await this.productRepository.softDelete(id)
        }
    
    // paginate
    async paginateService(options:IPaginationOptions):Promise<Pagination<ProductEntity>> {
        const productArray = await paginate<ProductEntity>(this.productRepository,options)
        return productArray
    }

    async paginateByProductName(options:IPaginationOptions, productName:string):Promise<Pagination<ProductEntity>> {
        const productArray = await this.productRepository.findAndCount({
            take:Number(options.limit),
            skip:(Number(options.page)-1)*Number(options.limit),
            order: { name:'ASC' },
            where: [{ name:Like(`%${productName}%`)  }]
        }) 
        // console.log(productArray) // phần tử 0 là các sp thỏa mãn, phần tử 1 là số sp thỏa mãn
        const totalProduct = productArray[1]
        const products = productArray[0]

        const productPageable:Pagination<ProductEntity> = {
            items:products,
            meta: {
                totalItems: totalProduct,
                itemCount: products.length,
                itemsPerPage: Number(options.limit),
                totalPages: Math.ceil(totalProduct / Number(options.limit)),
                currentPage: Number(options.page)
            },
            links: {
                first:options.route + `?limit=${options.limit}` + `&name=${productName}`,
                previous:Number(options.page) > 1 && Number(options.page) <=  Math.ceil(totalProduct/Number(options.limit))  ? options.route + `?page=${Number(options.page)-1}` + `&limit=${options.limit}` + `&name=${productName}` : '',
                next:Number(options.page) < Math.ceil(totalProduct/Number(options.limit)) ? options.route + `?page=${Number(options.page)+1}` + `&limit=${options.limit}` + `&userName=${productName}` :'',
                last:options.route + `?page=${Math.ceil(totalProduct/Number(options.limit))}` + `&userName=${productName}`
            }
        }

        return productPageable
    }

    
}