import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  // Index a product into Elasticsearch
  async indexProduct(product: any) {
    return this.elasticsearchService.index({
      index: 'products',
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
    return response.hits.hits.map((hit) => hit._source); // Extract search results
  }
}
