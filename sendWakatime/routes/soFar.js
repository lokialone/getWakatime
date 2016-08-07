const express = require('express')
const router = express.Router()
const monk = require('monk')


const db = monk('localhost:27017/wakatime')
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    console.log("we are connected")
})

const collection = db.get('wakatimes')

/* GET data so far*/
router.get('/', function(req, res, next) {
    collection.find({}).then(function(wdata) {
        let total_time = 0
        let total_time_average = 0
        let languages = []
        for (let i = 0; i < wdata.length; i++) {
            let data = wdata[i].data[0]
            total_time += data.grand_total.total_seconds

            for (let j = 0; j < data.languages.length; j++) {

                
                if (languages.length === 0) {
                    let language = {}
                    language['name'] = data.languages[j].name
                    language['total_seconds'] = data.languages[j].total_seconds
                    languages.push(language)
                } else {
                    let index = isHasLanguage(data.languages[j].name, languages)
                    
                    if (index) {
                        languages[index-1].total_seconds+=data.languages[j].total_seconds
                       
                    }else{
                        let language = {}
                        language['name'] = data.languages[j].name
                        language['total_seconds'] = data.languages[j].total_seconds
                        languages.push(language)
                    }
                }
            }
        }

        let dataSend = {}
        dataSend['total_time'] = total_time
        dataSend['total_time_average'] = total_time / wdata.length
        dataSend['languages'] = languages

        res.status(200).json(dataSend)

    })
})

function isHasLanguage(name, languages) {
    let flag = false
    for (let i = 0; i < languages.length;i++) {
        if (name === languages[i].name) {
            return i + 1
        }
    }
    return flag
}

module.exports = router
