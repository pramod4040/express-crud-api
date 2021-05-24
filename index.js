const express = require('express');
const fs = require('fs');
const { DefaultDeserializer } = require('v8');
const debug = require('debug')('myapp');
const path = require('path');

const app = express();

const port = 3000;
app.use(express.json()); 



app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/homepage.html'));
})

app.get('/person', (req, res) => {
    let rawdata = fs.readFileSync('data.json');
    let data = JSON.parse(rawdata);
    res.json(data);
})

app.post('/person/add', (req, res) => {
    let rawdata = fs.readFileSync('data.json');
    let data = JSON.parse(rawdata);
    let nextId = parseInt(data.person_data[data.person_data.length - 1].id) + 1;
    let newData = {"id": `${nextId}`, "name": req.body.name, "address": req.body.address};
    data.person_data.push(newData);
    fs.writeFileSync('data.json', JSON.stringify(data));
    res.json({"success": "success", "message": "Data Saved Successfully"})
})

app.get("/person/delete/:id", (req, res) => {
    let rawdata = fs.readFileSync('data.json');
    let data = JSON.parse(rawdata);
    let newData = data.person_data.filter(item => {
        if(parseInt(item.id) !== parseInt(req.params.id)){
            return true;
        }
    })
    fs.writeFileSync('data.json', JSON.stringify({"person_data": newData}));
    res.json({"success": "success", "message": "Data Deleted successfully"})
})

app.post('/person/edit/:id', (req, res) => {
    let rawdata = fs.readFileSync('data.json');
    let data = JSON.parse(rawdata);
    let newData = data.person_data.map((item) => {
        if(parseInt(item.id) === parseInt(req.params.id)){
            let nItem = {"id": item.id, "name": req.body.name, "address": req.body.address}
            return nItem;
        }
        return item;
    });
    fs.writeFileSync('data.json', JSON.stringify({"person_data": newData}));
    res.json({"success": "success", "message": "Data Edited Successfully"})
})



app.listen(port);


