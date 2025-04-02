import express from "express";
import bodyParser from "body-parser";
import multer from "multer";

const app = express();
const port = 4000;

app.use(express.static("uploads"));



const storage = multer.diskStorage({
    destination : function(req,file,cb){
        return cb(null,"./public/uploads");
    },
    filename: function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)
    },
});
 
const upload = multer({storage});
// const upload = multer({
//     dest: 'uploads/',
// });


  



app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",(req,res) =>{
    res.render("index.ejs");
});

// app.set("views engine","ejs");
// app.set("views",path.resolve("./views"));


// app.post("/submit",(req,res) =>{
//     console.log(req.body);
//     // res.render("index.ejs",{content:para});

//     // switch(req.body["choice"]){
//     //     case "create":res.render("/submit",(req,res) =>{});
//     //             break;
//     //     case "delete":res.render("/submit",(req,res) =>{});
//     //             break;
//     //     case "update":res.render("/submit",(req,res) =>{});
//     //             break;
//     //     default:res.render("/submit",(req,res) =>{});
//     //             break;
//     // }
// });

app.post("/create_form", upload.single('upload_image'),(req,res,next) =>{
    // if (!req.file) {
    //     return res.status(400).send('No file uploaded.');
    //   }
const path_way = ("./uploads/" + req.file["filename"]);
    
    console.log(req.body);
    console.log(req.file);
    console.log(req.file["path"]);

    res.render("index.ejs",{
        path: path_way,
        text: req.body["upload_text"],
    });
    // return res.redirect("/");
    next();
});

app.post("/delete_form",(req,res) =>{
    res.render
});


app.listen(port,() =>{
    console.log(`Listening to the port: ${port}`);
});
  



