$(document).ready(function (){
    var currentAccount = "";

    checkMM();

    $("#connectMM").click(function (){
        connectMM().then((data)=>{
            currentAccount = data[0];
            console.log(currentAccount);
        }).catch((err)=>{
            console.log(err);
        });
    });

  $("#btnDangky").click(function (){
      $.post("./dangky", {
          Email: $("#txtEmail").val(),
          Hoten: $("#txtHoten").val(),
          SoDT: $("#txtSdt").val(),
      }, function (data){
        console.log(data);
      })
  });
});

function checkMM(){
    if(typeof window.ethereum !== 'undefined' ){
        console.log("Metamask is installed");
    }else{
        console.log("Metamask is not installed");
    }
}

async function connectMM(){
    const accounts = await ethereum.request({method: 'eth_requestAccounts'});
    return accounts;
}



