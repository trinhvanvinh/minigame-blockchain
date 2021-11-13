var Hocvien = require("../models/Hocvien");


module.exports = function (app){
    app.get("/", function (req, res){
        res.send("OK");
    })

    app.post("/dangky", function (req, res){
        if(!req.body.Email || !req.body.Hoten || req.body.SoDT ){
            res.json({ketqua: 0, maloi: "Thieu tham so"});
        }else{
            var hocvienMoi = new Hocvien({
                Email: req.body.Email,
                Hoten: req.body.Hoten,
                SoDT: req.body.SoDT,
                ThanhToan: false,
                Vi: "",
                Ngay: Date.now()
            });

           hocvienMoi.save(function (err){
               if(err){
                   res.json({ketqua:0, maloi:"Mongodb save error"});
               }else{
                   res.json({ketqua:0, maloi:hocvienMoi});
               }
           })
        }
    })
}