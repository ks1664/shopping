require('dotenv').config();
const redis = require('redis');
// use the util module from nodejs to promisify redis requests
const util = require('util');

const redisUrl = `redis://${process.env.REDIS_URL}:${process.env.REDIS_PORT}`;

const redisClient = redis.createClient({
    url : redisUrl,
    legacyMode: true
});

redisClient.get = util.promisify(redisClient.get);
redisClient.set = util.promisify(redisClient.set);
redisClient.keys = util.promisify(redisClient.keys);
redisClient.del = util.promisify(redisClient.del);
redisClient.flushall = util.promisify(redisClient.flushall);

// Connect Redis server
redisClient.connect();

redisClient.on("ready", () => {
    console.log('✅ 💃 redis have ready !')
})

redisClient.on('connect', async() => {
    console.log('✅ 💃 connect redis success !')
});

redisClient.on("error", async(error) => {
    console.error(`❗️💃 Redis Error: ${error}`)
});

module.exports = {
    redisClient,
};
