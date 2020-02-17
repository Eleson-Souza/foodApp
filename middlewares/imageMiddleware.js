const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter: (req, file, next) => {
        const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
        if(allowed.includes(file.mimetype)) {
            next(null, true);
        } else {
            next({message: 'Arquivo não suportado'}, false);
        }
    }
};
exports.upload = multer(multerOptions).single('imagem');

exports.resize = async (req, res, next) => {
    if(!req.file) {
        next();
        return;
    }

    const ext = req.file.mimetype.split('/')[1];
    let fileName = `${uuid.v4()}.${ext}`;
    req.body.imagem = fileName;

    const imagem = await jimp.read(req.file.buffer);
    await imagem.resize(800, jimp.AUTO);
    await imagem.write(`./public/media/${fileName}`);
    next();
};