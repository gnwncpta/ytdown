const fs = require('fs');
const ytdl = require('ytdl-core');
const chalk = require('chalk');

(async function(){


    const videoURL = fs.readFileSync('./links.txt', { encoding: 'utf-8' }).split('\n');

    videoURL.forEach(async (url, index) => {
        const isVideoValid = ytdl.validateURL(url);
    
        if(!isVideoValid){
            return console.log(`${chalk.red("Invalid Video URL!")}\n${url}`);
        } else {
            const info = await ytdl.getInfo(url);
            const format = ytdl.chooseFormat(info.formats, { quality: '22' });
            showDownloding({ title: info.videoDetails.title, container: format.container });
            ytdl(url, { format })
                .pipe(fs.createWriteStream(`${info.videoDetails.title}.${format.container}`));
        }
    })
    
    function showDownloding({ title, container }){
        console.log(`Downloading ...\n${chalk.green(`"${title}.${container}"`)}\n`);
    };

})();
