import { Injectable } from '@nestjs/common';

import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Injectable()
export class PubSubService {
  readonly pubSub = pubSub
}
