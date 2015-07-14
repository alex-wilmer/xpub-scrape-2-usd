const express = require(`express`)
const request = require(`request`)
const cheerio = require(`cheerio`)
const app = express()
const xpub =
  `xpub6BexSzHWoWSfWXXu7EpU4mnSVaN8JPPGLRsSD2GbK69hs5pXDqra`
+ `ghhM7Lc64DArtf9ZUh4TkMwDFieXVk1MdrXCUYS7v7P3VXqNZ81NAkr`

const btcAvgUrl = `https://api.bitcoinaverage.com/ticker/global/USD/`

app.get(`/getPrice`, (req, res) => {
  const url = `https://blockchain.info/xpub/${xpub}`

  request(url, (error, response, html) => {
    if (!error) {
      const $ = cheerio.load(html)

      $(`#final_balance span`).filter(function () {
        const satoshis = +this.attribs['data-c']
        const bitcoins = satoshis / 10e7
        request(btcAvgUrl, (error, response, html) => {
          const last = JSON.parse(response.body).last
          res.send(

           `<h2>BTC -> USD = $${last}</h2>
            <h3>Wallet: ${xpub}</h3>
            <h4>USD: $${(last * bitcoins).toFixed(2)}</h4>
            <h5>Satoshis: ${satoshis}</h5>`
          )
        })
      })
    }
  })
})

app.listen(`8081`)

console.log(`Magic happens on port 8081`)

exports = module.exports = app
