module.exports.home = function(req,res){
    console.log('home controller loaded');
    return res.render('home',{
        title:'ABC Hospital'
    });
};
