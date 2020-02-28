import { Injectable } from '@nestjs/common';
import { CrawlerServiceQueuePageconfig } from './crawler.interfaces';

const Crawler = require("crawler");

const crawler = new Crawler({
  // 两次请求之间将闲置1000ms
  // rateLimit: 1000,
  forceUTF8: true,
  maxConnection: 10,
  // skipDuplicates: true,
})

@Injectable()
export class CrawlerService {
  readonly crawler = crawler

  queue(uri: string, description?: any) {
    return new Promise<any>((resolve, reject) => {
      console.log(`正在获取：`, uri, description ?? '');
      this.crawler.queue({
        uri: encodeURI(uri),
        forceUTF8: true,
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

  queues(uri: string[]) {
    return new Promise<any>((resolve, reject) => {
      const _crawler = new Crawler({
        // 两次请求之间将闲置1000ms
        // rateLimit: 1000,
        forceUTF8: true,
        maxConnection: 10,
        // skipDuplicates: true,
        callback: function (error, res, done) {
          if (error) {
            reject(error)
          } else {
            resolve(res)
          }
          done();
        }
      })
      _crawler.queue(uri.map(u => encodeURI(u)))
    })
  }

  async queuePage(uri: string, pageDom: string, config: CrawlerServiceQueuePageconfig = {}, resArray = []) {
    const _config: CrawlerServiceQueuePageconfig = {
      startPage: 1,
      limitPage: 1,
      ...config,
    }

    const _uri = uri.replace('{{page}}', String(_config.startPage))

    const { $ } = await this.queue(_uri)
    const _resArray = [...resArray, $]
    const nextPage = $(pageDom).text()
    // console.log('nextPage:', nextPage)
    if (nextPage && _config.startPage < _config.limitPage) {
      _config.startPage = _config.startPage + 1
      return await this.queuePage(uri, pageDom, _config, _resArray)
    } else {
      return _resArray
    }
  }
}
