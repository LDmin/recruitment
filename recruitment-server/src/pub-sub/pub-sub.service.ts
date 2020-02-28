import { Injectable } from '@nestjs/common';

import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class PubSubService {
  readonly pubSub: PubSub

  constructor() {
    this.pubSub = new PubSub()
  }
}
