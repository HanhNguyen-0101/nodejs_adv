import { Client } from '@elastic/elasticsearch';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  constructor(
    @Inject('ELASTICSEARCH_CLIENT')
    private readonly elasticsearchService: Client,
  ) {}

  // Index a product into Elasticsearch
  async indexProduct(product: any) {
    return this.elasticsearchService.index({
      index: 'products',
      id: product.productid,
      body: product,
    });
  }

  // Search products by name or description
  async searchProducts(searchTerm: string, skip = 0, take = 10) {
    const response = await this.elasticsearchService.search({
      index: 'products',
      body: {
        query: {
          multi_match: {
            query: searchTerm,
            fields: ['name', 'description'], // Search in multiple fields
          },
        },
        from: skip,
        size: take,
      },
    });
    const skipPagingResult = await this.elasticsearchService.search({
      index: 'products',
      body: {
        query: {
          multi_match: {
            query: searchTerm,
            fields: ['name', 'description'], // Search in multiple fields
          },
        },
      },
    });
    return {
      products: response.hits.hits.map((hit) => hit._source),
      total: skipPagingResult.hits.hits.map((hit) => hit._source)?.length,
    }; // Extract search results
  }
}
