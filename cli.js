#!/usr/bin/env node
const VERSION = require('./package.json').version
const program = require('commander')
const path = require('path')
const { commodity } = require('ledger-types')
const home = require('user-home')
const CoinMarketCap = require('coinmarketcap-api')
const client = new CoinMarketCap()
const { getFS } = require('guld-fs')
var fs

/* eslint-disable no-console */
program
  .name('guld-market')
  .version(VERSION)
  .description('Guld market information and tools.')
  .command('price [asset]')
  .description('Get the price of the given asset (Default: GULD)')
  .action(async (asset, options) => {
    asset = asset || 'GULD'
    var price = await commodity.getCommodityPrice(asset, 'USD', 'isysd')
    console.log(commodity.parseCommodityPrice(price, asset).value.toString())
  })
program
  .command('update [asset]')
  .description('Update the price of the given asset (Default: all)')
  .action(async (ass, options) => {
    var exchange = options.exchange || 'coinmarketcap'
    fs = fs || await getFS()
    async function updateAsset (asset) {
      console.log(asset)
      var ticker = await client.getTicker({currency: asset})
      var roundprice = Math.round(ticker.data.quotes.USD.price * 100000) / 100000
      var invprice = Math.round((1 / ticker.data.quotes.USD.price) * 100000) / 100000
      var time = Math.trunc(Date.now() / 1000)
      var date = new Date(time * 1000)
      var ta = date.toISOString().split('T')
      var datestr = `${ta[0].replace(/-/g, '/')}`
      var timestr = `${ta[1].split('.')[0]}`
      var pdb = `P ${datestr} ${timestr} ${asset.toUpperCase()} $${roundprice}
P ${datestr} ${timestr} $ ${invprice} ${asset.toUpperCase()}
P ${datestr} ${timestr} ${asset.toUpperCase()} ${roundprice} USD
P ${datestr} ${timestr} USD ${invprice} ${asset.toUpperCase()}
`
      await fs.mkdirp(path.join(home, 'market', 'USD', asset, 'prices'))
      await fs.writeFile(path.join(home, 'market', 'USD', asset, 'prices', `${exchange}.dat`), pdb)
    }
    if (ass && ass !== undefined) updateAsset(ass)
    else {
      var list = (await fs.readdir(path.join(home, 'market', 'USD'))).filter(e => !e.startsWith('.') && e !== 'GULD') // remove once GULD lists on coinmarketcap
      await Promise.all(list.map(e => updateAsset(e).catch(e => {}))).catch(e => {})
    }
  })
/* eslint-enable no-console */

program.parse(process.argv)
