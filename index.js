var fs = require('fs');
var prompt = require('prompt');
var util = require('util');
var colors = require('colors/safe');

prompt.message = colors.yellow("Question!");
prompt.delimiter = colors.green(" %% ");

//Service directory
var serviceDir = './service/';
var newDir;

prompt.get({
    properties: {
        directory: {
            message: colors.green('Please enter a new folder name')
        }
    }
}, function (err, result) {

    var directory = result.directory;

    createFolder(directory)
});

function createFolder(directory) {

    newDir = serviceDir + directory

    fs.mkdir(newDir, function (err) {
        if (err) {
            console.log(colors.red('Sorry there was a problem, try creating a folder with a different name.'));
        } else {

            console.log(colors.blue('Your folder has been created and the directory is: ' + newDir));

            fs.mkdir(newDir + '/images', function (err) {

                if (err) {
                    console.log(colors.red('Sorry there was a problem creating the images folder.'));
                } else {
                    // Continue
                }
                buildJson(newDir)
            })
        }
    });

};


function buildJson(newDir) {
    prompt.start();
    prompt.get({
        properties: {
            answer: {
                message: colors.green('Copy and paste your images to the newly created folder. When done Please enter go')
            }
        }
    }, function (err, result) {

        var answer = result.answer.toLowerCase();

        if (err) {
            console.log(colors.red('Sorry there was a problem'));
        } else if (answer === 'go') {
            getJsonObj(newDir)
        }

        function getJsonObj(newDir) {

            var imagesDir = newDir +'/images'

            fs.readdir(imagesDir, function (err, files) {

                if (err) {
                    console.log(colors.red('Sorry the JSON file could not be built'));
                } else {
                    // Build JSON
                    var data = {
                        "userjourneys": []
                    };

                    fs.exists(newDir + 'data.js', function (exists) {
                        if (exists) {
                            console.log(colors.red("Sorry file exists please delete the file in order to continue"));
                        } else {
                            for (var i = 0; i <= files.length - 1; i++) {

                                data.userjourneys.push({
                                    "caption": files[i].replace('.png', '.').replace('-', ' '),
                                    "note": "Agents are asked if they want to switch to the new service. If they select ‘no’ they are redirected to HMRC online portal services."
                                });
                            }

                            var json = JSON.stringify(data);
                            fs.writeFile(newDir + '/data.js', 'var data = ' + json + '');
                        }
                    });

                }

            })
        }

    });

}



