const express = require('express');
const morgan = require('morgan');   //middlewares : Tool for login requests that comes to ones server
const bodyParser = require('body-parser'); //middlewares : Allows the server  to recieve data from the user


const urls = require('./db/urls');

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());  //allows the server to recieve json from the client and use it
app.use(express.static('./client')); // when a request comes in check if the file exists in the client folder and server it


app.get('/:name', async (req,res) => {
    const Target = await urls.find(req.params.name);
    if(Target){
        res.redirect(Target.url)
    }
    else{
        res.redirect(`/404.html?name=${req.params.name}`);
    }

})

app.post('/api/shorten', async (req,res) => {
    console.log(req.body);
    
    try {
        const url = await urls.create(req.body);
            res.json(url);
        
    } catch (error) {
        res.status(500);
        res.json(error);
    }
}); //way to have a parameter in the url
// app.get('/', (req,res) => {
//     res.send("hellow world!!");
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on the port ${PORT}`);
});
