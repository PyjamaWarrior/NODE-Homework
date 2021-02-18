const fs = require('fs');
const path = require('path');
const goodPath = path.join(__dirname, 'good');
const badPath = path.join(__dirname, 'bad');

function mover(goodPath, badPath) {
    fs.readdir(badPath, (err, files) => {
        if (err) {
            console.log(err);
            return;
        }

        files.forEach(file => {
            const newPath = path.join(badPath, file);

            fs.stat(newPath, (err1, stats) => {
                if (err1) {
                    console.log(err1);
                    return;
                }

                if (stats.isDirectory()) {
                    mover(goodPath, newPath);
                    return;
                }

                fs.rename(newPath, path.join(goodPath, file), err2 => {
                    if (err2) {
                        console.log(err2);
                    }
                })
            })
        })
    })
}

mover(goodPath, badPath);
