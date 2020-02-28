import { Injectable, Inject } from '@nestjs/common';
import Axios from 'axios'
import { FetchJobsServie } from './job.interface'
import { Job } from './models/jobs';
import { CrawlerService } from 'src/crawler/crawler.service';
import { PubSubService } from 'src/pub-sub/pub-sub.service';
import { JobsArgs } from './dto/jobs.args';
const cheerio = require('cheerio')

@Injectable()
export class GxrcService implements FetchJobsServie {

  @Inject(PubSubService)
  private readonly PubSubService: PubSubService

  constructor(private readonly crawlerService: CrawlerService) { }

  async getAddress(href: string, desc?: string) {
    const res = await this.crawlerService.queue('https:' + href, desc)
    const reg = /\<p\>联系地址：\<label\>(.+)\<\/label\>\<\/p\>/

    return res?.body?.match(reg)[1]
  }

  async getLocation(address: string): Promise<[number, number]> {
    const amapKey = '94b526d257d94e84271dee543e278bae'
    // const amapKey = 'b7f95aca697c0d8c20e027c63d52b8d1'

    // const ops = address.map(s => ({
    //   url: `https://restapi.amap.com/v3/place/text?key=${amapKey}&keywords=${s}&city=南宁`
    // }))

    // const res = await Axios.post(`https://restapi.amap.com/v3/batch?key=${amapKey}`, { ops })

    const res = await Axios.get(encodeURI(`https://restapi.amap.com/v3/place/text?key=${amapKey}&keywords=${address}&city=南宁`))

    const location: string = res?.data?.pois?.[0]?.location
    if (res?.status === 200 && location) {
      const arr = location.split(',')
      return [Number(arr[0]), Number(arr[1])]
    } else {
      console.log(res);

    }

    return null

  }

  async getJobs(keyword: string) {
    if (!keyword) {
      return
    }

    const resArray: any[] = await this.crawlerService.queuePage(`https://s.gxrc.com/sJob?keyword=${keyword}&schType=1&page={{page}}`, 'li.PagedList-skipToNext')

    const items: Job[] = []

    for (let i = 0; i < resArray.length; i++) {
      const $ = resArray[i]
      const rlOnes = $('.posDetailWrap .rlOne')

      for (let index = 0; index < rlOnes.length; index++) {
        const d = cheerio(rlOnes[index])
        const href: string = d.find('.w1 h3 a').attr('href');
        const sArr = href.split('\/')
        const id = sArr[sArr.length - 1]

        const address = await this.getAddress(href, d.find('.w1 h3 a').text())

        const location = await this.getLocation(address)

        if (location) {
          // items.push({
          //   id,
          //   detailUrl: href,
          //   name: d.find('.w1 h3 a').text(),
          //   company: d.find('.w2 a').text(),
          //   pay: d.find('.w3').text() ?? '0',
          //   address,
          //   location,
          //   updateAt: new Date(d.find('.w5').text()),
          // })

          this.PubSubService.pubSub.publish('jobs', {
            jobs: items
          })
        }
      }
    }
  }

  async getJob({ keyword, clientId, fetchId, cityId }: JobsArgs) {
    if (!keyword) {
      return
    }

    const resArray: any[] = await this.crawlerService.queuePage(`https://s.gxrc.com/sJob?district=${cityId}&keyword=${keyword}&schType=1&page={{page}}`, 'li.PagedList-skipToNext')

    const items: Job[] = []

    for (let i = 0; i < resArray.length; i++) {
      const $ = resArray[i]
      const rlOnes = $('.posDetailWrap .rlOne')

      for (let index = 0; index < rlOnes.length; index++) {
        const d = cheerio(rlOnes[index])
        const href: string = d.find('.w1 h3 a').attr('href');
        const sArr = href.split('\/')
        const id = sArr[sArr.length - 1]
        const name = d.find('.w1 h3 a').text()

        const address = await this.getAddress(href, name)

        const location = await this.getLocation(address)

        if (location) {
          this.PubSubService.pubSub.publish('job', {
            clientId,
            fetchId,
            job: {
              clientId,
              fetchId,
              id,
              detailUrl: href,
              name,
              company: d.find('.w2 a').text(),
              pay: d.find('.w3').text() ?? '0',
              address,
              location,
              updateAt: new Date(d.find('.w5').text()),
            }
          })
        }
      }
    }
  }
}
