const profileResource = (req,res,next)=>{
    const limit = req.query.limit ? req.query.limit:15 ;
    const page = req.query.page ? req.query.page:1 ;
    let nextpage = 0;
    if(Math.round(req.totaldata / limit) > page){
        nextpage = page + 1;
    }else{
        nextpage = page;
    }

    let arrayResult = [];
    req.profiles.forEach(element => {
        arrayResult.push({
            _id: element._id,
            user_id: element.user_id,
            name: element.name,
            mobile: element.mobile,
            address: element.address,
            provinsi_id: element.kecamatan[0] ? element.kecamatan[0].provinsi_id : null,
            kabupaten_id: element.kecamatan[0] ? element.kecamatan[0].kabupaten_id : null,
            kecamatan_id : element.kecamatan_id,
            kecamatan_name : element.kecamatan[0] ? element.kecamatan[0].name : null,
        })
    });

    res.status(200).json({
        data:arrayResult,
        curentpage:page,
        perpage:limit,
        nextpage:nextpage,
        totalpage:Math.round(req.totaldata / limit),
        status : 200,
    })
}

module.exports = profileResource;