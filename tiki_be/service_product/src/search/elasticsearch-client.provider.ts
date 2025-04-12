import { Provider } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

export const ElasticsearchClientProvider: Provider = {
  provide: 'ELASTICSEARCH_CLIENT',
  useFactory: () => {
    return new Client({
      node: process.env.ELASTIC_NODE || 'http://localhost:9200',
      auth: {
        username: process.env.ELASTIC_USER || '',
        password: process.env.ELASTIC_PASS || '',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  },
};