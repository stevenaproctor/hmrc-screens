var fs = require('fs');
var prompt = require('prompt');
var util = require('util');
var colors = require('colors/safe');

prompt.message = colors.yellow("Question!");
prompt.delimiter = colors.green(" %% ");

//Service directory
var serviceDir = './service/';
var newDir;
var scenarioName;
var serviceTitle;

var schema = {
    properties: {
        serviceName: {
            message: colors.green('What is the service called?')
        },
        scenarioName: {
            message: colors.green('Enter the name of the scenario for this service.')
        },
        directoryName: {
            message: colors.green('Please enter a new directory name for this service')
        }
    }
}

prompt.get(schema, function (err, result) {

    if (err) {
        console.log('Sorry there was an error.', err)
        process.exit(1)
    }
    scenarioName = result.scenarioName
    serviceTitle = result.serviceTitle
    createNewFolder(result.directoryName)

})


//Create the folder for the new service

function createNewFolder(directory) {

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
                    fs.readFile('./template/index.html', function (err, data) {
                        fs.writeFile(newDir + '/index.html', data);
                        buildJson(newDir)
                    });
                }

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

            var imagesDir = newDir + '/images'

            fs.readdir(imagesDir, function (err, files) {

                if (err) {
                    console.log(colors.red('Sorry the JSON file could not be built'));
                } else {
                    // Build JSON
                    var data = {
                        "service": scenarioName,
                        "last-updated": "Some date",
                        "userjourneys": [{
                            "title": serviceTitle,
                            "path": []
                        }]
                    };

                    fs.exists(newDir + 'data.js', function (exists) {
                        if (exists) {
                            console.log(colors.red("Sorry file exists please delete the file in order to continue"));
                        } else {
                            for (var i = 0; i <= files.length - 1; i++) {

                                data.userjourneys[0].path.push(
                                    {
                                        "caption": files[i].replace(/((-?[0-9]+-?).*(\.gif|\.png|\.jpg))/, '').replace(/-/g, ' '),
                                        "imgref": "images/" + files[i],
                                        "note": "Notes go here..."
                                    }
                                );
                            }
                            var json = JSON.stringify(data);
                            fs.writeFile(newDir + '/data.js', 'var data = ' + json + '');

                            console.log(colors.green('Service is now complete and is waiting for you, you can find it here ' + newDir + '/index.html'))
                        }
                    });

                }

            })
        }

    });

}






