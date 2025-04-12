import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { ElasticsearchClientProvider } from './elasticsearch-client.provider';

@Module({
  providers: [ElasticsearchClientProvider, SearchService],
  exports: [SearchService],
})
export class SearchModule {}
