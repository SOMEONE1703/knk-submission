var express = require('express');
var router = express.Router();
const path=require("path");
const fs=require('fs');
const multer = require('multer');
const form_data = require('form-data');
const upload = multer({ dest: 'uploads/' });
const { exec } = require('child_process');
const main_tests=[];

function test_case(person_id,test_id,input,expected_out){
    this.input=input;
    this.expected_out=expected_out;
    this.result='not-a-value';
    this.out;
    this.test=function(){
        //console.log("me?");
        exec(`${this.code} < ${input}`, (error, stdout, stderr) => {
            //console.log("starting");
            if (error) {
                this.result="exexution error";
                console.error(`execution error: ${error}`);
        
                return;
        
            }
            //console.log(`stdout: ${stdout}`);
            this.out=stdout;
            if (stdout==expected_out){
                //console.log("test reveals true");
                this.result=true;
                //console.log(this);
            }
            else{
                //console.log("test reveals false");
                this.result=false;
                //console.log(this);
            }
            //console.log("end");
        
        });
    }
}
async function run_test(id,input,output){
    exec(`${id}.exe < ${input}`, (error, stdout, stderr) => {
        //console.log("starting");
        if (error) {
            console.error(`execution error: ${error}`);
            return "exexution error";
        }
        if (stdout==output){
            return true;
        }
        else{
            return false;
        }
        //console.log("end");
    
    });
}

function adding_test(person_id,test_id){
    this.test_id=test_id;
    this.person_id=person_id;
    this.input=["tests/adding/1.txt","tests/adding/2.txt","tests/adding/3.txt"];
    this.expected_out=[9,604,880];
    this.output=[];
    this.score='not-a-value';
    this.test = async function(){
        //console.log("me?");
        for (let i=0;i<input.length;i++){
            const outcome = await run_test(person_id,input[i],output[i]);
            if (this.score=='not-a-value'){
                this.score=0;
            }
            if (outcome){
                this.output.push("Passed");
                this.score++;
            }
            else{
                this.output.push("Failed");
            }
        }
    }
    this.test();
}

function test(test_id,id){
    this.test_id=test_id;
    this.id=id;
    this.score=0;
    this.tests=[];
    this.code=`${id}.cpp`;
    this.compiled=false;
    this.compile=function(){
        exec(`g++ ${this.code} -o ${this.id}.exe`, (error, stdout, stderr) => {
            if (error) {
                
                console.error(`compile error: ${error}`);
                
                return;
        
            }
            //console.log("compiled");
            this.compiled=true;
        
            
        });
    }
    this.run_tests=function(){
        this.score++;
        for (let i=0;i<this.tests.length;i++){
            this.tests[i].test();
            //this.score+=(100/this.tests.length);
        }
    }
    
}

function compile(id){
    exec(`g++ ${id}.cpp -o ${id}.exe`, (error, stdout, stderr) => {
        if (error) {
            console.error(`compile error: ${error}`);
            return "compile error";
        }
        return "done";
    });
}
router.get('/', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/submission.html");
  res.sendFile(filePath);
});
router.get('/problem', function(req, res, next) {
    const filePath = path.join(__dirname, "../public/problem.html");
    res.sendFile(filePath);
  });

router.get('/results', function(req, res, next) {
    const filePath = path.join(__dirname, "../public/results.html");
    res.sendFile(filePath);
});

router.post('/results', function(request, response, next) {
    let ID=request.body.id;
    let name=request.body.name;
    let index=-1;
    //console.log(main_tests);
    for (let i=0;i<main_tests.length;i++){
        if (main_tests[i].test_id==name&&main_tests[i].id==ID){
            index=i;
        }
    }
    if (index===-1){
        response.status(404).send("Test not found");
    }
    else{
        let n_tests=3;
        main_tests[index].tests.push(new test_case(`${ID}`,"tests/adding/1.txt",9));
        main_tests[index].tests.push(new test_case(`${ID}`,"tests/adding/2.txt",604));
        main_tests[index].tests.push(new test_case(`${ID}`,"tests/adding/3.txt",880));
        main_tests[index].run_tests();
        let arr=[];
        for (let i=0;i<n_tests;i++){
            //console.log(main_tests[index].tests[i]);
            //console.log(main_tests[index].tests[i]);
            if (main_tests[index].tests[i].result=="not-a-value"){}
            else if (main_tests[index].tests[i].result){
                arr.push("Passed");
            }
            else{
                arr.push("Failed");
            }
        }
        response.status(200).send({tests:arr,score:main_tests[index].score});
        
    }
});

router.post("/:id",upload.single('file'),(request,response,next)=>{
    if (!request.file){
        response.status(400).send('No files uploaded');
        return;
    }
    let ID=request.params.id;
    
    let filePath=request.file.path;
    var f=`${ID}.cpp`;
    var co_res="not done";
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err}`);
            response.status(500).send('Error reading file');
            return;
        }

        fs.writeFile(f, data, (err) => {
            if (err) {
                console.error(`Error writing to file: ${err}`);
                return;
            }
            co_res=compile(ID);
            exec(`g++ ${ID}.cpp -o ${ID}.exe`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`compile error: ${error}`);
                    response.status(200).send("compile error");
                }
                response.status(200).send("done");
            });
            //console.log(`first write to ${f} successfully`);
        });
        
    });
    
    //now for the messed up part

    //main_tests.push(new test_case(ID,"adding","tests/adding/1.txt",9));
    //main_tests.push(new test_case(ID,"adding","tests/adding/2.txt",604));
    //main_tests.push(new test_case(ID,"adding","tests/adding/3.txt",880));
    main_tests.push(new adding_test(ID,"adding"));
    // test1.tests.push(new test_case(`${ID}`,"tests/adding/1.txt",9));
    // test1.tests.push(new test_case(`${ID}`,"tests/adding/2.txt",604));
    // test1.tests.push(new test_case(`${ID}`,"tests/adding/3.txt",880));
    
    response.status(200).send(main_tests);
    
    
});


router.get("/:id/:func",function(request,response){
    let ID=request.params.id;
    let name=request.params.func;
    let index=-1;
    
    
    //console.log(main_tests);
    for (let i=0;i<main_tests.length;i++){
        if (main_tests[i].test_id==name&&main_tests[i].id==ID){
            index=i;
        }
    }
    if (index===-1){
        response.status(404).send("Test not found");
    }
    else{
        let n_tests=3;
        main_tests[index].run_tests();
        let arr=[];
        for (let i=0;i<n_tests;i++){
            //console.log(main_tests[index].tests[i]);
            //console.log(main_tests[index].tests[i]);
            if (main_tests[index].tests[i].result=="not-a-value"){}
            else if (main_tests[index].tests[i].result){
                arr.push("Passed");
            }
            else{
                arr.push("Failed");
            }
        }
        response.status(200).send({tests:arr,score:main_tests[index].score});
        
    }

    //response.send(main_tests);
});




router.get("/:id",function(req,res){
    res.send(main_tests);
});


module.exports = router;
