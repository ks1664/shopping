const _ = require('lodash');

const XLSX = require('xlsx')

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const DataHelper = require('../../../helpers/v1/data.helpers')
const _DataHelper = new DataHelper()

const ProductsResource = require('./products.resources');
const _Product = new ProductsResource();

const OrderServices = require('./../../../services/orders.service')
const _OrderService = new OrderServices()

const ProductImagesResource = require('../product_images/product_images.resources')
const _ProductImage = new ProductImagesResource()

const BrandResource = require('../brands/brands.resources')
const _Brand = new BrandResource()

const SupplyResource = require('../supplies/supplies.resources')
const _Supply = new SupplyResource()

const CategoryResource = require('../category/categories.resources')
const _Category = new CategoryResource()

const ServicesResources = require('./../services/services.resources');
const _Services = new ServicesResources();

const CouponResources = require('./../coupons/coupons.resources');
const _Coupon = new CouponResources();

const UserServices = require('./../../../services/user.service')
const _User = new UserServices();

const ReviewResource = require('../reviews/reviews.resources')
const _Review = new ReviewResource()

module.exports = class ProductsController {

    async import(req, res) {
        console.log("CategoriesController@import");

        // let service_id = req.params.serviceId
        let path = req.file.path;

        // Read excelsheet
        var workbook = XLSX.readFile(path);
        var sheet_name_list = workbook.SheetNames;
        let jsonData = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheet_name_list[0]]
        );

        // let productsDataArr = [];

        for (let productData of jsonData) {

            const productName = productData.name;
            const productImage = productData.image;
            const productDescription = productData.description;
            const productPrice = productData.price;
            const productSku = productData.sku;
            const brandName = productData.brand_name;
            const productWeight = productData.weight;
            const productLength = productData.length;
            const productBreadth = productData.breadth;
            const productHeight = productData.height;

            const isProductExist = await _Product.isProductExist('name', productName);
            if (isProductExist) {
                continue;
            }

            const categoryName = productData.catagory_name ? productData.catagory_name.toLowerCase() : false;
            if (!categoryName || categoryName == 'null') {
                continue;
            }

            const categoryObj = await _Category.getByColumnNameAndValue('name', categoryName);
            if (!categoryObj) {
                continue;
            }

            let brandId = null;
            const brandObj = await _Brand.getByColumnNameAndValue('name', brandName);
            if (brandObj) {
                brandId = brandObj.id;
            }

            const productDataObj = {
                brand_id: brandId,
                category_id: categoryObj.id,
                service_id: categoryObj.service_id,
                name: productName,
                image: productImage,
                description: productDescription,
                price: productPrice ? parseFloat(String(productPrice).replace(/^\D|,+/g, '')) : -1,
                sku: productSku,
                weight: productWeight,
                length: productLength,
                breadth: productBreadth,
                height: productHeight,
                created_by: 'admin'
            }

            const productObj = await _Product.createOne(productDataObj);
            // productsDataArr.push(productDataObj);

            if (productObj) {

                // Store product images
                if (productObj.image && !['NULL', 'null'].includes(productObj.image)) {
                    const productImageData = {
                        product_id: productObj.id,
                        url: productObj.image
                    }
                    await _ProductImage.createOne(productImageData);
                }

                // Store data in supplies with few dummy sellers
                const results = await _User.getSellers(
                    req.headers['authorization'],
                    {
                        page: 1,
                        limit: 10,
                        serviceId: categoryObj.service_id
                    }
                );

                if (results?.sellers?.data && results?.sellers.data.length > 0) {
                    for (let seller of results.sellers.data) {
                        const supplyData = {
                            seller_id: seller.unique_uuid,
                            product_id: productObj.id,
                            total_quantity: 1000,
                            rest_quantity: 1000,
                            price: productObj.price,
                            seller_price: Number(productObj.price) - 5,
                            status: 1
                        }
                        await _Supply.createOne(supplyData);
                    }
                }
            }

        }

        // let result = await _Product.insertMultipleProducts(productsDataArr)
        // if (!result) {
        //     return response.badRequest('not found', res, false);
        // }

        return response.success('successfully done', res, {});
    }

    // async import(req, res) {
    //     console.log("CategoriesController@import");

    //     let service_id = req.params.serviceId
    //     let path = req.file.path;

    //     // Read excelsheet
    //     var workbook = XLSX.readFile(path);
    //     var sheet_name_list = workbook.SheetNames;
    //     let jsonData = XLSX.utils.sheet_to_json(
    //         workbook.Sheets[sheet_name_list[0]]
    //     );

    //     const lastAddedProduct = await _Product.getLastInsertedProduct();
    //     let skuNo = lastAddedProduct.id;

    //     let productsDataArr = [];
    //     let existedBrandsArr = [];
    //     let existedCategoryArr = [];
    //     let existedSubCategoryArr = [];
    //     let existedSubSubCategoryArr =[];

    //     for (let productData of jsonData) {
    //         const productName = productData.TITLE;

    //         const isProductExist = await _Product.isProductExist('name', productName);
    //         if(isProductExist){
    //             continue;
    //         }

    //         skuNo = skuNo + 1;
    //         // get or save new brands in DB
    //         const brandName = productData.BRAND;
    //         let brandId;
    //         let existedBrand = existedBrandsArr.find(item => item.name == brandName)
    //         if(!existedBrand){
    //             let brandObj = await _Brand.getByColumnNameAndValue('name', brandName);
    //             if (!brandObj) {
    //                 brandObj = await _Brand.createOne({ name: brandName, description: brandName });
    //             }
    //             existedBrandsArr.push({name: brandName, id: brandObj.id});
    //             brandId = brandObj.id;
    //         }
    //         else {
    //             brandId =  existedBrand.id
    //         }    

    //         // get or save new categories in DB
    //         const categoryName = productData.CATEGORY;
    //         let categoryId;
    //         let existedCategory = existedCategoryArr.find(item => item.name == categoryName)
    //         if (!existedCategory) {
    //             let categoryObj = await _Category.getByColumnNameAndValue('name', categoryName);
    //             if (!categoryObj) {
    //                 const category_uuid = await _DataHelper.generateUuid()
    //                 const categoryData = {
    //                     name: categoryName,
    //                     category_uuid: category_uuid,
    //                     description: categoryName,
    //                     service_id: service_id,
    //                     slug: await _DataHelper.generateSlug(categoryName)

    //                 };
    //                 categoryObj = await _Category.createOne(categoryData);
    //             }

    //             existedCategoryArr.push({name: categoryName, id: categoryObj.id});  
    //             categoryId = categoryObj.id             
    //         }
    //         else {
    //             categoryId =  existedCategory.id
    //         }  

    //         // get or save new SUBCATEGORIES in DB
    //         const subCategoryName = productData.SUBCATEGORIES;
    //         let subCategoryId = categoryId;
    //         if(subCategoryName){
    //             let existedSubCategory = existedSubCategoryArr.find(item => item.name == subCategoryName)
    //             if (!existedSubCategory) {
    //                 let subcategoryObj = await _Category.getByColumnNameAndValue('name', subCategoryName);
    //                 if (!subcategoryObj) {
    //                     const sub_category_uuid = await _DataHelper.generateUuid()
    //                     const subcategoryData = {
    //                         parent_id: categoryId,
    //                         name: subCategoryName,
    //                         service_id: service_id,
    //                         category_uuid: sub_category_uuid,
    //                         description: subCategoryName,
    //                         slug: await _DataHelper.generateSlug(subCategoryName)
    //                     };

    //                     subcategoryObj = await _Category.createOne(subcategoryData);
    //                 }
    //                 existedSubCategoryArr.push({name: subCategoryName, id: subcategoryObj.id});  
    //                 subCategoryId = subcategoryObj.id
    //             }
    //             else {
    //                 subCategoryId =  existedSubCategory.id
    //             }
    //         } 

    //         // get or save new SUBSUBCAT in DB
    //         const subSubCategoryName = productData.SUBSUBCAT;
    //         let subSubCategoryId = subCategoryId;
    //         if(subSubCategoryName){
    //             let existedSubSubCategory = existedSubSubCategoryArr.find(item => item.name == subSubCategoryName)

    //             if (!existedSubSubCategory) {
    //                 let subSubcategoryObj = await _Category.getByColumnNameAndValue('name', subSubCategoryName);
    //                 if (!subSubcategoryObj) {
    //                     const sub_sub_category_uuid = await _DataHelper.generateUuid()
    //                     const subSubcategoryData = {
    //                         parent_id: subCategoryId,
    //                         name: subSubCategoryName,
    //                         service_id: service_id,
    //                         category_uuid: sub_sub_category_uuid,
    //                         description: subSubCategoryName,
    //                         slug: await _DataHelper.generateSlug(subSubCategoryName)
    //                     };
    //                     subSubcategoryObj = await _Category.createOne(subSubcategoryData);
    //                 }
    //                 existedSubSubCategoryArr.push({name: subSubCategoryName, id: subSubcategoryObj.id});
    //                 subSubCategoryId = subSubcategoryObj.id
    //             }
    //             else {
    //                 subSubCategoryId =  existedSubSubCategory.id
    //             }
    //         }

    //         const productDataObj = {
    //             brand_id: brandId,
    //             category_id: subSubCategoryId ? subSubCategoryId 
    //                             : subCategoryId ? subCategoryId 
    //                                 : categoryId,
    //             name: productName,
    //             image: productData.IMG_URL,
    //             description: productName,
    //             price: productData.PRICE == 'See price in cart' || productData.PRICE == 'Price Varies' 
    //                     ? 0 
    //                     : parseFloat(String(productData.PRICE).replace( /^\D|,+/g, '')),
    //             sku: 'sku_' + skuNo,
    //             created_by: 'admin'
    //         }
    //         // await _Product.createOne(productDataObj)
    //         productsDataArr.push(productDataObj);
    //     }

    //     let result = await _Product.insertMultipleProducts(productsDataArr)
    //     if (!result) {
    //         return response.badRequest('not found', res, false);
    //     }

    //     return response.success('successfully done', res, {});
    // }

    async getAll(req, res) {
        console.log('ProductsController@getAll')

        const data = _.pick(req.body, ['page', 'limit', 'search', 'seller_id', 'service_id', 'service_type', 'brand_id', 'category_ids', 'sub_category_ids', 'product_ids'])

        // Collected the category ids
        let categoryIds;
        if (!data.sub_category_ids && data.category_ids && data.category_ids != '') {
            categoryIds = data.category_ids.split(',');

            let childCategories = await _Category.getChildCategories(categoryIds)
            if (childCategories?.data && childCategories.data.length > 0) {
                childCategories.data.forEach(element => {
                    categoryIds.push(element.id)
                });
            }
        }

        if (data.sub_category_ids && data.sub_category_ids != '') {
            categoryIds = data.sub_category_ids.split(',');

            let childCategories = await _Category.getChildCategories(categoryIds)
            if (childCategories?.data && childCategories.data.length > 0) {
                childCategories.data.forEach(element => {
                    categoryIds.push(element.id)
                });
            }
        }

        // Collected the product ids and convert it into ids array
        let productIds;
        if (data.product_ids && data.product_ids != '') {
            productIds = data.product_ids.split(',');
        }

        const filterData = {
            search: data.search,
            sellerId: data.seller_id,
            serviceId: data.service_id,
            brandId: data.brand_id,
            serviceType: data.service_type,
            categoryIds: categoryIds,
            productIds: productIds
        };

        let results = await _Product.getAll(data.page, data.limit, filterData);
        if (!results) {
            return response.notFound('No products found!', res, false);
        }

        for (let product of results.data) {

            // Appended the product price and remaining qty (Fetched by the supplier data)

            if (product.supplies && product.supplies.length > 0) {
                product.setDataValue('price', product.supplies[0].price);
                product.setDataValue('rest_quantity', product.supplies[0].rest_quantity);
            }

            // Appended the product health rating average
            let productIngredients = product.product_ingredient;

            if (productIngredients && productIngredients.length > 0) {
                let healthRatingSum = 0;

                for (var i = 0, _len = productIngredients.length; i < _len; i++) {
                    if (productIngredients[i]?.ingredient?.health_rating) {
                        healthRatingSum += productIngredients[i].ingredient.health_rating;
                    }
                }

                const healthRating = healthRatingSum / productIngredients.length;
                product.setDataValue('health_rating', healthRating > 0 ? healthRating : 0);
            }

            else {
                product.setDataValue('health_rating', 0);
            }
        }

        return response.success('Products found', res, results);
    }

    async getOne(req, res) {
        console.log('ProductsController@getOne');

        let result;
        if(req.params.sku){
            result = await _Product.getOneByColumnNameAndValue('sku', req.params.sku);
        }
        else {
            result = await _Product.getOneByColumnNameAndValue('id', req.params.id);
        }
        if (!result) {
            return response.notFound('not_found', res, false);
        }

        // Appended the seller details, product price and remaining qty (Fetched by the supplier data)
        if (result.supplies && result.supplies.length > 0) {
            let supplies = result.supplies;

            if (req.query.seller_id && req.query.seller_id != '') {
                supplies = result.supplies.filter(item => item.seller_id == req.query.seller_id);
            }

            const sellerIds = supplies.map(item => item.seller_id);
            if(sellerIds && sellerIds.length > 0){
                let sellerDetails = await _User.getUserProfileByUids(req.headers['authorization'], sellerIds);
                
                for(let supply of supplies){
                    if(sellerDetails && sellerDetails.length > 0){
                        const seller = sellerDetails.find(item => item.unique_uuid == supply.seller_id);
                        // To DO
                        const sellerRating = {
                            rating: 3.7,
                            review_count: 5
                        };

                        seller.rating = sellerRating;
                        supply.setDataValue('seller_details', seller);
                    }
                    else {
                        supply.setDataValue('seller_details', null);
                    }
                }
            }

            result.setDataValue('supplies', supplies);
            result.setDataValue('price', supplies[0].price);
            result.setDataValue('seller_price', supplies[0].seller_price);
            result.setDataValue('rest_quantity', supplies[0].rest_quantity);
        }

        // Appended the product health rating average
        const productIngredients = result.product_ingredient;
        if (productIngredients.length > 0) {
            let healthRatingSum = 0;

            for (var i = 0, _len = productIngredients.length; i < _len; i++) {
                if (productIngredients[i]?.ingredient?.health_rating) {
                    healthRatingSum += productIngredients[i].ingredient.health_rating;
                }
            }

            const healthRating = healthRatingSum / productIngredients.length;
            result.setDataValue('health_rating', healthRating > 0 ? healthRating : 0);
        }

        else {
            result.setDataValue('health_rating', 0);
        }

        // To Do
        const sellerRating = {
            rating: 3.7,
            review_count: 5
        };

        const productRating = {
            rating: 3.7,
            review_count: 5
        };

        return response.success('success', res, {
            product_detail: result,
            seller_rating: sellerRating,
            product_rating: productRating
        });
    }

    async getTopSellingProducts(req, res) {
        console.log('OrderDetailsController@getTopSellingProducts')

        const data = _.pick(req.body, ['page', 'limit', 'seller_id'])

        // Fetched top selling product ids from orders micrservices
        let productIds = await _OrderService.getTopSellingProductIds(req.headers['authorization'], { seller_id: data.seller_id })
        if (!productIds || productIds.length <= 0) {
            return response.notFound('No products found', res, false);
        }

        const filterData = {
            sellerId: data.seller_id,
            productIds: productIds
        };

        let results = await _Product.getAll(data.page, data.limit, filterData);
        if (!results) {
            return response.notFound('No products found!', res, false);
        }

        let sellerInfo = await _User.getUserProfileByUuid(req.headers['authorization'], data.seller_id);

        return response.success('products found', res, {
            ...results,
            sellerInfo: sellerInfo
        });
    }

    async getTrendingProducts(req, res) {
        console.log('CategoriesController@getTrendingProducts')

        const data = _.pick(req.body, ['page', 'limit', 'service_id', 'seller_id', 'service_type', 'brand_id'])

        const trendingProductIds = await _OrderService.getTrendingIds(req.headers['authorization'], 'product', data.limit, data.service_id, data.seller_id);
        if (!trendingProductIds || trendingProductIds.length <= 0) {
            return response.notFound('No products found', res, false);
        }

        const filterData = {
            sellerId: data.seller_id,
            serviceId: data.service_id,
            serviceType: data.service_type,
            brandId: data.brand_id,
            productIds: trendingProductIds
        };

        let results = await _Product.getAll(data.page, data.limit, filterData);
        if (!results || !results.data) {
            return response.notFound('No products found!', res, false);
        }

        // Appended health rating average of each products
        for(let product of results.data){
            const productIngredients = product.product_ingredient;
            if (productIngredients.length > 0) {
                let healthRatingSum = 0;

                for (var i = 0, _len = productIngredients.length; i < _len; i++) {
                    if (productIngredients[i]?.ingredient?.health_rating) {
                        healthRatingSum += productIngredients[i].ingredient.health_rating;
                    }
                };

                const healthRating = healthRatingSum / productIngredients.length;
                product.setDataValue('health_rating', healthRating > 0 ? healthRating : 0);
            }
            else {
                product.setDataValue('health_rating', 0);
            }
        }
            
        return response.success('Products found', res, results);
    }

    async getDashboardData(req, res) {
        console.log('ProductController@customerHomeData');

        const authToken = req.headers['authorization'];
        let services = await _Services.getAll(1, 100);
        let coupons = await _Coupon.getAll(1, req.body.coupons_limit);

        // Fetched the trending sellers of each services
        let trendingSellersByServices = [];
        if (services?.data) {
            for (let service of services.data) {
                const sellersFilter = {
                    page: 1,
                    limit: req.body.trending_sellers_limit,
                    serviceId: service.id,
                    needTrending: 'true'
                }

                let result = await _User.getSellers(authToken, sellersFilter);
                if (result) {
                    trendingSellersByServices.push({
                        service: {
                            name: service.name,
                            slug: service.slug,
                            image: service.image
                        },
                        sellers: result?.sellers?.data ? result.sellers.data : []
                    });
                }
            }
        }

        // Fetched the recently added sellers
        let recentlyAddedSellers = await _Supply.getRecentlyAddedSellers(5);
        if (recentlyAddedSellers && recentlyAddedSellers.length > 0) {
            for (let recentlyAddedSeller of recentlyAddedSellers) {
                let sellerInfo = await _User.getUserProfileByUuid(authToken, recentlyAddedSeller.seller_id);

                // To Do
                const sellerRating = {
                    rating: 3.7,
                    review_count: 5
                };

                recentlyAddedSeller.setDataValue('seller_info', sellerInfo);
                recentlyAddedSeller.setDataValue('seller_rating', sellerRating);
            }
        }

        const results = {
            services: services?.data ? services.data : [],
            coupons: coupons?.data ? coupons.data : [],
            recently_added_sellers: recentlyAddedSellers,
            service_sellers: trendingSellersByServices
        };
        return response.success('Dashboard data!', res, results);
    }

    async deleteInventory(req, res) {
        console.log('ProductController@deleteInventory');
        
        await _Product.deleteAll();
        await _Category.deleteAll();

        return response.success('Inventory deleted successfully', res, true);
    }

    async getProductsToReviews(req,res){
        console.log('ReviewsController@getProductsToReviews');

        const data = _.pick(req.body, ['page', 'limit', 'flag'])
        const authToken = req.headers['authorization'];
        const userId = req.user.unique_uuid;

        const reviewedOrderIds = await _Review.getOrderIds({userId: userId});
        let filterObj = {
            orderIds: reviewedOrderIds.toLocaleString()
        }
        
        if(data.flag != 'past'){
            filterObj = {...filterObj, userId: userId}
        }
        else if(!reviewedOrderIds || reviewedOrderIds.length <= 0){
            return response.notFound('No products found!', res, false);
        }

        const productAndOrders = await _OrderService.getProductIdAndOrderForReview(authToken, filterObj);
        if(!productAndOrders || productAndOrders.length <= 0){
            return response.notFound('No products found!', res, false);
        }

        let productIds = productAndOrders.map(item => item.product_id);
        productIds = [...new Set(productIds)];
        const productFilterData = {
            productIds: productIds
        };

        let products = await _Product.getAll(data.page, data.limit, productFilterData);
        if (!products) {
            return response.notFound('No products found!', res, false);
        }
        products = products.data.map(item => item.toJSON({ include: true }));

        let sellerIds = productAndOrders.map(item => item.seller_id);
        sellerIds = [...new Set(sellerIds)];
        let sellerDetails = await _User.getUserProfileByUids(authToken, sellerIds);

        let results = [];
        for(let productAndOrder of productAndOrders){
            const productDetail = await products.find(item => item.id == productAndOrder.product_id);
            const sellerDetail = await sellerDetails.find(item => item.unique_uuid == productAndOrder.seller_id);
            delete sellerDetail.user_locations;
            delete productDetail.supplies;
            delete productDetail.product_ingredient;
            delete productDetail.product_attribute;

            results.push({
                ...productDetail,
                order_detail: {
                    order_id: productAndOrder.order_id,
                    created_at: productAndOrder.created_at
                },
                seller_detail: sellerDetail
            });
        }

        return response.success('Products found!', res, results);
    };

}