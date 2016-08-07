const https = require('https');
const mongo = require('mongodb');
const monk = require('monk');

const API_KEY = "37cad197-f282-483f-b6d6-1ccb527ae05a";
const URL_BASE = 'https://wakatime.com/api/v1/users/current/summaries';

/*数据库连接 start*/
const db = monk('localhost:27017/wakatime');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("we are connected");
});
/*数据库连接 end*/

/*像wakatime.com发送请求，取得数据并保存到数据库中  start*/

const times = ["2016-08-01", "2016-08-02", "2016-08-03", "2016-08-04","2016-08-05"];
    
    time = times[4];
    let path = "/api/v1/users/current/summaries?start=" + time + "&end=" + time + "&api_key=" + API_KEY;
    let options = {
        hostname: 'www.wakatime.com',
        port: 443,
        path: path,
        method: 'GET'
    };

    let req = https.request(options, (res) => {
        var data = '';
        res.on('data', (d) => {
            data += d;
            // process.stdout.write(d);  
        });

        res.on('end', () => {
            const collection = db.get('wakatimes');
            var json_data = JSON.parse(data.toString());
            collection.insert(json_data);
        });
    });

    req.end();
    req.on('error', (e) => {
    console.error(e);
    });








/*发送请求，取得数据  end*/
