const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const authorModel = require("../models/author")


router.get('/',(req,res)=>{
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name,'i')
    }
    authorModel.find(searchOptions,(err,authors)=>{
        if(err){
            res.render("authors/index",{
                errorMessage:"Error displaying author"
            })
        }else{
            res.render("authors/index.ejs",{
                authors:authors,
                searchOptions:req.query 
            })
        }
    })
})


router.get('/new',(req,res)=>{
    res.render('authors/new')
})

router.post('/',(req,res)=>{
    authorModel.create({name:req.body.name})
    .then((author)=>{
        res.redirect("/authors")
        console.log(author)
    })
    .catch((err)=>{
        console.log(err)
        res.render("authors/new",{
            errorMessage:'Error creating Author'
        })
    })
})

module.exports = router