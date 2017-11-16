var express = require('express');
var router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'tmp/', fileFilter:fileFilter});
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Upload de fichiers multiples' });
});


router.post('/uploaddufichier', upload.array('monfichier', 4), function(req, res, next){
  
  req.files.forEach(function(image){
 
    if (image.size<(3*1024*1024)){
    //traitement du formulaire
  
    //déplacement fichier du tmp à public/images
      fs.rename(image.path, 'public/images/' + image.originalname, function(err){
        if (err) {
            res.send('problème durant le déplacement'); 
        } 
      }); 
    } else {
      return next(new Error('le fichier ' + image.originalname + ' est trop gros'));
      //res.send('le fichier ' + image.originalname + ' est trop gros');
    }
  });
  res.send('fichiers téléchargés avec succès');
});

function fileFilter(req, file, cb){
  const extension = file.mimetype.split('/')[1];
  if(extension !== 'png'){
      return cb(new Error('le fichier ' + file.originalname + ' n\'est pas en png' ), false);
  }
  cb(null, true);
};

module.exports = router;
