var Hocvien = require("../models/Hocvien");


module.exports = function (app){
    app.get("/", function (req, res){

        var Teo = new Hocvien({
            Email: "trinhvanTeo@gmail.com",
            Hoten: "trinhvanTeo",
            SoDT: "09090909",
            ThanhToan: false,
            Vi: "0x123",
            Ngay: Date.now()
        });

        res.json(Teo);
    })
}