'use strict';
const Provinsi = require("../../models/provinsi");
const Kabupaten = require("../../models/kabupaten");
const Kecamatan = require("../../models/kecamatan");
const mongoose = require('mongoose');
const fs = require('fs');

module.exports = (req,res,next) =>{
    fs.readFile('indonesia.json', (err, data) => {
        if (err) throw err;
        let indonesia = JSON.parse(data);
        // console.log(indonesia);
        // res.send(indonesia[0].id);
        //code sudah jalan klo di jalankan lagi jadi double

        indonesia.forEach(element => {
            const provinsi = new Provinsi({
                _id: new mongoose.Types.ObjectId(),
                id: element.id,
                name:element.name,
            });
            provinsi.save().then()
                .catch(err => {
                    res.status(500).json({
                    error: err, status:500, message:"save privinsi fail"
                    });
                });

                element.regencies.forEach(eachRegencies => {
                    const kabupaten = new Kabupaten({
                        _id: new mongoose.Types.ObjectId(),
                        provinsi_id:element.id,
                        id: eachRegencies.id,
                        name:eachRegencies.name,
                    });
                    kabupaten.save().then()
                        .catch(err => {
                            res.status(500).json({
                            error: err, status:500, message:"save kabupaten fail"
                            });
                        });

                        eachRegencies.districts.forEach(eachDistricts => {
                            const kecamatan = new Kecamatan({
                                _id: new mongoose.Types.ObjectId(),
                                provinsi_id:element.id,
                                kabupaten_id:eachRegencies.id,
                                id: eachDistricts.id,
                                name:eachDistricts.name,
                            });
                            kecamatan.save().then()
                                .catch(err => {
                                    res.status(500).json({
                                    error: err, status:500, message:"save kecamatan fail"
                                    });
                                });
                        });
                });
        });

        res.send("langsung return coba cek apakah sudah di save collection")
    });

}