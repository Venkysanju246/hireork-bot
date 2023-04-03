const {Client} = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const {Configuration, OpenAIApi} = require("openai");

const client = new Client();

client.on('qr',(qr) =>{
    qrcode.generate(qr,{small:true});
});

client.on('ready',() =>{
    console.log("Client is ready");
});

client.initialize();

const configuration = new Configuration({
    apiKey : "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",
});
const openai = new OpenAIApi(configuration);

async function runCompletion(message){
    const completion = await openai.createCompletion({
        model:"text-davinci-003",
        prompt: message,
        max_tokens: 2500,
    });
    return completion.data.choices[0].text;
}
client.on('message',message => {
    console.log(message.body);
    runCompletion(message.body).then(result => message.reply(result))
})