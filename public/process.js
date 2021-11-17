$(document).ready(function (){

    const abi = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_vi",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                }
            ],
            "name": "sm_ban_data",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                }
            ],
            "name": "DangKy",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "arrHocvien",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "_ID",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_VI",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    const addressSM = "0xBB1271eb9a28d3bC35D848428f4A83C06933fA1C";
    const web3 = new Web3(window.ethereum);
    window.ethereum.enable();

    let contract_mm = new web3.eth.Contract(abi, addressSM);
    console.log("contract ", contract_mm);

    // tao contract infura
    var provider = new Web3.providers.WebsocketProvider("wss://kovan.infura.io/ws/v3/aa66e37382964271ae2960d7b5322e27");
    var web3_infura = new Web3(provider);
    var contract_infura = web3_infura.eth.Contract(abi, addressSM);
    console.log("contract_infura ", contract_infura)
    contract_infura.events.sm_ban_data({filter:{}, fromBlock: "latest"}, function (error, event){
        if(error){
            console.log(error);
        }else{
            console.log(event);
            $("#tbDS").append(` 
                <tr id="dong1" >
                    <td>`+event.returnValues[0]+`</td>
                    <td>`+event.returnValues[1]+`</td>
                </tr>`
            );
        }
    });

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
      if(currentAccount.length == 0){
          alert("Vui long dang nhap metamask");
          return;
      }
      $.post("./dangky", {
          Email: $("#txtEmail").val(),
          Hoten: $("#txtHoten").val(),
          SoDT: $("#txtSdt").val(),
      }, function (data){
        console.log(data);
        if(data.ketqua == 1){
            contract_mm.methods.DangKy(data.maloi._id).send({
                from: currentAccount,
            });
        }
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



