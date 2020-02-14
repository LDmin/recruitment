import { Injectable } from '@nestjs/common';
import { CrawlerServiceQueuePageconfig } from './crawler.interfaces';

const Crawler = require("crawler");

const crawler = new Crawler({
  // 两次请求之间将闲置1000ms
  rateLimit: 1000,
})

@Injectable()
export class CrawlerService {
  readonly crawler = crawler

  queue(uri: string) {
    return new Promise<any>((resolve, reject) => {
      this.crawler.queue({
        uri,
        callback: function (error, res, done) {
          if (error) {
            reject(error)
          } else {
            resolve(res)
          }
          done();
        }
      })
    })
  }

  async queuePage(uri: string, pageDom: string, config: CrawlerServiceQueuePageconfig = {}, resArray = []) {
    const _config: CrawlerServiceQueuePageconfig = {
      startPage: 1,
      limitPage: 3,
      ...config,
    }

    const _uri = uri.replace('{{page}}', String(_config.startPage))

    const { $ } = await this.queue(_uri)
    const _resArray = [...resArray, $]
    const nextPage = $(pageDom).text()
    // console.log('nextPage:', nextPage)
    if (nextPage && _config.startPage < 3) {
      _config.startPage = _config.startPage + 1
      return await this.queuePage(uri, pageDom, _config, _resArray)
    } else {
      return _resArray
    }
  }
}
