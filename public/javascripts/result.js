function switch_lead(){

}
function switch_problem(){

}
function switch_submit(){

}
function switch_next(){
    window.location.href="/submit/results";
}
function get_res(){
    console.log("call");
    //let url="https://knk-submission.azurewebsites.net/submit/1/adding"
    fetch("/submit/1/adding",{
        method:'GET'
    }).then(res=>{
        if (res.ok){
            console.log("worked");
            return res.json();
        }
        else{
            console.log("did not work")
        }
    })
    .then(data=>{
        console.log(data);
        const wher=document.getElementById("result");
        var v = 0;
        if (data.tests.length==0){
            var temp= document.getElementById("submit");
            var t= document.createElement("h1");
            t.textContent="Not Submitted";
            temp.replaceChildren(t);
        }
        else{
            var temp= document.getElementById("submit");
            var t= document.createElement("h1");
            t.textContent="Submitted";
            temp.replaceChildren(t);
        }
        for (let i=0;i<data.tests.length;i++){
            console.log("weird");
            var where= document.createElement("section");
            where.style.display="flex";
            where.style.flexDirection="row";
            var testcaseResult1=document.createElement("section");
            testcaseResult1.className="them";
            
            var testcaseResult2=document.createElement("section");
            testcaseResult2.className="they";
            testcaseResult1.textContent=`Test Case ${i+1} :   `;
            if (data.tests[i]=="Passed"){
                testcaseResult2.textContent+="Passed";
                testcaseResult2.style.backgroundColor="Green";
                v+=(100/data.tests.length);
            }
            else{
                testcaseResult2.textContent+="Failed";
                testcaseResult2.style.color="Red";
            }
            where.appendChild(testcaseResult1);
            where.appendChild(testcaseResult2);
            wher.appendChild(where);
            var some= document.getElementById("grade");
            some.textContent=v;
        }
        
        
        
    })
    .catch(error=>console.error('ERROR',error))
}

get_res();
console.log("well what the hell");