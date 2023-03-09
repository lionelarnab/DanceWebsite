const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const boyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactusDance');
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const port = 80;

//making mongoose schema
const contactSchema = new mongoose.Schema({ //Creating a schema with name kittySchema
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const Contact = mongoose.model('Contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // set the template as pug engine
app.set('views',path.join(__dirname, 'views')); //set the views directory

//ENDPOINTS
app.get('/', (req,res)=>{
    const params = { };
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req,res)=>{
    const params = { };
    res.status(200).render('contact.pug', params);
})
app.get('/about', (req,res)=>{
    const params = { };
    res.status(200).render('aboutus.pug', params);
})
app.get('/classinfo', (req,res)=>{
    const params = { };
    res.status(200).render('classinfo.pug', params);
})
app.get('/services', (req,res)=>{
    const params = { };
    res.status(200).render('services.pug', params);
})


app.post('/contact', (req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved")
    });
    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})