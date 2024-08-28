require('dotenv').config();
const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');
const { CronJob } = require('cron'); // Import CronJob from the cron library

const postToInsta = async () => {
    try {
        const ig = new IgApiClient();
        ig.state.generateDevice(process.env.IG_USERNAME);
        await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

        const imageBuffer = await get({
            url: 'INSERT_IMAGE_LINK', // Replace with actual image URL
            encoding: null, 
        });

        await ig.publish.photo({
            file: imageBuffer,
            caption: 'INSERT_CAPTION', // Replace with your caption
        });

        console.log('Post successfully published!');
    } catch (error) {
        console.error('Error posting to Instagram:', error);
    }
};

const cronInsta = new CronJob('0 8 * * *', async () => { // Posts every day at 8 AM
    await postToInsta();
}, null, true, 'America/New_York'); // Set your time zone

cronInsta.start(); // Start the cron job

postToInsta(); // Initial post to test
