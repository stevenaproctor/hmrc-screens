var fs = require('fs');
var prompt = require('prompt');
var util = require('util');
var colors = require('colors/safe');

prompt.message = colors.yellow("Question!");
prompt.delimiter = colors.green(" %% ");

//Service directory
var serviceDir = './service/';
var newDir;
var serviceType;
var serviceTitle;

//Name the service type
function init() {

    prompt.get({
            properties: {
                serviceType: {
                    message: colors.green('What is the service called?')
                }
            }
        },

        function (err, result) {

            if (err) {
                console.log(colors.red('Sorry there is a problem with the service name.'));
            } else {
                serviceType = result.serviceType;
            }

            getServiceTitle()

        });

}


//Enter a service a title

function getServiceTitle() {
    prompt.get({
            properties: {
                serviceTitle: {
                    message: colors.green('Enter a title for the service.')
                }
            }
        },

        function (err, result) {

            if (err) {
                console.log(colors.red('Sorry there is a problem with that service title. The error is' + err));
            } else {
                serviceTitle = result.serviceTitle;
            }

            getFolderName()

        });

}

//Name the folder for the new service

function getFolderName() {
    prompt.get({
        properties: {
            directory: {
                message: colors.green('Please enter a new folder name')
            }
        }
    }, function (err, result) {

        if (err) {
            console.log(colors.red('Sorry there is a problem creating the folder name. The error is' + err));
        } else {

            var directory = result.directory;
        }
        createNewFolder(directory)
    });
}


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
                        "service": serviceType,
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
                                        "caption": files[i].replace(/\.jpg$|\.gif$|\.png$/, '').replace(/[0-9]+/, '').replace(/-/g, ' '),
                                        "imgref": "images/" + files[i],
                                        "note": "Notes go here..."
                                    }
                                );
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

init();






