import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule } from '@nestjs/config';
import { SearchService } from './search.service';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load this first
    ElasticsearchModule.register({
      node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
      maxRetries: 5,
      requestTimeout: 60000,
      sniffOnStart: true,
    }),
  ],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
