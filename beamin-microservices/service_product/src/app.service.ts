import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from './entities/product.entity';
import { Prisma } from '@prisma/client';
import { SearchService } from './search/search.service';
import { CacheService } from './cache/cache.service';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private readonly searchService: SearchService,
    private readonly cacheService: CacheService,
  ) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.productsWhereUniqueInput;
    where?: Prisma.productsWhereInput;
    orderBy?: Prisma.productsOrderByWithRelationInput;
    searchTerm?: string;
  }): Promise<{ products: any; total: number }> {

    const cacheKey = 'products_list'; // Unique cache key
    const cachedData = await this.cacheService.getProductCache(cacheKey);

    if (cachedData) {
      console.log('Returning data from cache');
      return cachedData; // Return cached data
    }

    console.log('Fetching data from database');

    const { skip, take, cursor, where, orderBy, searchTerm } = params;

    const enhancedWhere: Prisma.productsWhereInput = {
      ...where,
      OR: searchTerm
        ? [
            { name: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
          ]
        : undefined,
    };
  
    // Fetch paginated products
    const rawProducts = await this.prisma.products.findMany({
      skip,
      take,
      cursor,
      where: enhancedWhere,
      orderBy,
      include: {
        categories: true,
        shops: true,
      },
    });
  
    // Transform the raw products to match the `Product` type
    const products = rawProducts.map((product) => ({
      ...product,
      category: product.categories, // Map `categories` to `category`
      shop: product.shops,         // Map `shops` to `shop`
    }));
  
    // Fetch total count
    const total = await this.prisma.products.count({
      where: enhancedWhere,
    });

    // Cache the result for 1 hour (3600 seconds)
    await this.cacheService.setProductCache(cacheKey, { products, total }, 3600);
  
    return { products, total };
  }

  async findOne(
    productWhereUniqueInput: Prisma.productsWhereUniqueInput,
  ): Promise<Product | null> {
    return this.prisma.products.findUnique({
      where: productWhereUniqueInput,
      include: {
        categories: true,
        shops: true
      }
    }) as Promise<Product | null>;
  }

  async create(data: Prisma.productsCreateInput): Promise<Product> {
    const product = await this.prisma.products.create({
      data,
      include: {
        shops: true,
        categories: true
      }
    });

    if (!product.shops) {
      throw new Error('Shop property is missing in the product.');
    }

    if (!product.categories) {
      throw new Error('Category property is missing in the product.');
    }

    await this.searchService.indexProduct(product); // Index product in Elasticsearch

    return product as unknown as Product;
  }

  async update(params: {
    where: Prisma.productsWhereUniqueInput;
    data: Prisma.productsUpdateInput;
  }): Promise<Product> {
    const { data, where } = params;
    const product = await this.prisma.products.update({
      data,
      where,
      include: {
        shops: true,
        categories: true
      }
    });

    if (!product.shops) {
      throw new Error('Shop property is missing in the product.');
    }

    if (!product.categories) {
      throw new Error('Category property is missing in the product.');
    }
    await this.searchService.indexProduct({ id: where.product_id, ...data }); // Reindex updated product

    return product as unknown as Product;
  }

  async remove(where: Prisma.productsWhereUniqueInput): Promise<Product> {
    const product = await this.prisma.products.delete({
      where,
      include: {
        shops: true,
        categories: true
      }
    });

    if (!product.shops) {
      throw new Error('Shop property is missing in the product.');
    }

    if (!product.categories) {
      throw new Error('Category property is missing in the product.');
    }

    return product as unknown as Product;
  }
}
