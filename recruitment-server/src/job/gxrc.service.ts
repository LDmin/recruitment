import { Injectable } from '@nestjs/common';
import { FetchJobsServie } from './job.interface'
import { Job } from './models/jobs';
import { CrawlerService } from 'src/crawler/crawler.service';
const cheerio = require('cheerio')

@Injectable()
export class GxrcService implements FetchJobsServie {
  constructor(private readonly crawlerService: CrawlerService) { }

  async findAll(keyword: string) {
    const resArray: any[] = await this.crawlerService.queuePage(encodeURI(`https://s.gxrc.com/sJob?keyword=${keyword}&schType=1&page={{page}}`), 'li.PagedList-skipToNext')
    console.log(keyword);

    const items: Job[] = []

    resArray.forEach($ => {
      const rlOnes = $('.posDetailWrap .rlOne')

      rlOnes.each((i, elememt) => {
        const d = cheerio(elememt)
        items.push({
          id: d.find('.w1 h3 a').attr('href'),
          name: d.find('.w1 h3 a').text(),
          company: d.find('.w2 a').text(),
          pay: d.find('.w3').text() ?? '',
          address: d.find('.w4').text(),
          updateAt: new Date(d.find('.w5').text()),
        })
      })
    });

    return items
  }
}
