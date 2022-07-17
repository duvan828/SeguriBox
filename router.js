const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();


// 3 - Invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});


// 7 - Configuramos las variables de sesion 
const session = require('express-session');
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// 8 - Invocamos al modulo de conexion al base de datos
const conexion = require('./database/db');
const { redirect } = require('express/lib/response');

var storage = multer.diskStorage({
  destination: path.join(__dirname, '/public/fotosPerfil'),
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
 
router.use(multer({
    storage: storage,
    dest: path.join(__dirname, '/public/fotosPerfil')
}).single('imagen'));

router.get('/', (req, res)=>{
    res.render('index', {mensaje:""});
});

router.get('/registro', (req, res) =>{
    res.render('registro');
});


router.post('/save', (req,res) =>{
    const nombre1 = req.body.nombre1;
    const nombre2 = req.body.nombre2;
    const apellido1 = req.body.apellido1;
    const apellido2 = req.body.apellido2;
    const documentos = req.body.documentos;
    const nDocumento = req.body.nDocumento;
    const fecha = req.body.fecha;
    const genero = req.body.genero;
    const correo = req.body.correo;
    const usuario = req.body.usuario;
    const contraseña = req.body.contrasena;
   conexion.query(`CALL nuevoRegistro(${nDocumento},"${nombre1}" ,"${nombre2}", "${apellido1}", "${apellido2}", "${documentos}", "${fecha}", "${genero}" , "${usuario}", "${correo}", "${contraseña}")`, (error, results)=>{
    let resultado  = Object.values(JSON.parse(JSON.stringify(results[0])));   
    let msg = resultado[0].valor;
       if(msg == 'guardado'){
        res.render('registro',{
            alert: true,
            alertTitle: "Registrarse",
            alertMessage: "¡Registro Existoso!",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 2500,
            ruta: '/'
        })
       }else if( msg == 'usuario existe'){
        res.render('registro',{
            alert: true,
            alertTitle: "",
            alertMessage: "¡Usuario ya existe!",
            alertIcon: "warning",
            showConfirmButton: false,
            timer: 2500,
            ruta: '/registro'
        })
       } else if( msg == 'correo existe'){
        res.render('registro',{
            alert: true,
            alertTitle: "",
            alertMessage: "¡Correo ya existe!",
            alertIcon: "warning",
            showConfirmButton: false,
            timer: 2500,
            ruta: '/registro'
        })
        }
   })
})

// login


router.post('/acceder',  (req, res) => {
    const correoUser = req.body.correoUser;
    const contraseña = req.body.contraseña;
    console.log(correoUser + " " + contraseña);
    conexion.query(`CALL comprobarInicio("${correoUser}", "${contraseña}")`, (error, result) => {
        let resultado  = Object.values(JSON.parse(JSON.stringify(result[0])));
        let id = resultado[0].idSB;
        let msg = resultado[0].valor;
        console.log(resultado);
        if( msg == 'iniciado'){
            res.redirect('/securitybox/'+id);
        } else if (msg == "incorrecta"){
            res.render('index', {mensaje:"La contraseña es incorrecta."});
        } else if(msg == 'no existe') {
            res.render('index', {mensaje:"La cuenta no existe. <a href='/registro'> regitrate aquí </a>"});
        } else {
            res.redirect('/');
        }
            
    });
});

router.get('/securitybox/:id', (req, res) => {
    const id = req.params.id;
    conexion.query(`
    SELECT SHA2(c.idcuenta, 224) AS idcuenta, c.correoUsuario, AES_DECRYPT(c.contraseña, "superSB") AS contraseña, (SELECT nombre FROM Sitio 
                    WHERE idsitio=c.idsitio) as Sitio, 
                (SELECT url FROM Sitio 
                    WHERE idsitio=c.idsitio) as url FROM Cuentas c 
    WHERE SHA2(idSB, 224)="${id}"`, (error, cuentas) => {
        conexion.query(`SELECT * FROM Sitio WHERE SHA2(idSB, 224) = "${id}"`, (error2, sitios) => {
            conexion.query(`CALL buscarImg("${id}")`, (err, result) => {
                let resultado  = Object.values(JSON.parse(JSON.stringify(result[0])));
                let ruta = resultado.length == 0 ? '/fotosPerfil/defecto.jpg' : resultado[0].nombre;
                res.render('securitybox', {id:id, sitios:sitios, cuentas:cuentas, img:ruta});
            });
        });
    });
});

router.get('/securitybox-busca/:id', (req, res) => {
    const id = req.params.id;
    const busca = req.query.busca;
    console.log(busca);
    conexion.query(`
    SELECT SHA2(c.idcuenta, 224) AS idcuenta, c.correoUsuario, AES_DECRYPT(c.contraseña, "superSB") AS contraseña, (SELECT nombre FROM Sitio 
				WHERE idsitio=c.idsitio) as Sitio, 
            (SELECT url FROM Sitio 
				WHERE idsitio=c.idsitio) as url FROM Cuentas c
    WHERE SHA2(idSB, 224)="${id}" AND c.idsitio IN (SELECT idsitio FROM Sitio WHERE nombre LIKE "%${busca}%");`, 
    (error, cuentas) => {
        conexion.query(`SELECT * FROM Sitio WHERE SHA2(idSB, 224) = "${id}"`, (error2, sitios) => {
            conexion.query(`CALL buscarImg("${id}")`, (err, result) => {
                let resultado  = Object.values(JSON.parse(JSON.stringify(result[0])));
                let ruta = resultado.length == 0 ? '/fotosPerfil/defecto.jpg' : resultado[0].nombre;
                res.render('securitybox', {id:id, sitios:sitios, cuentas:cuentas, img:ruta});
            });
        });
    });
});

router.post('/guardar-cuenta/:id', (req, res) =>{
    const id = req.params.id;
    const idSitio = req.body.sitio;
    const usuario = req.body.user;
    const contraseña = req.body.pass;
    conexion.query(`CALL guardarCuentas("${id}", '${usuario}', '${contraseña}', ${idSitio});`, (error, result) => {
        res.redirect('/securitybox/'+id);
    });
});

router.post('/guardar-sitio/:id', (req, res) => {
    const id = req.params.id;
    const nombre = req.body.NombreSitio;
    const url = req.body.url;
    conexion.query(`CALL guardarSitio("${id}", '${nombre}', '${url}')`, (error, result) => {
        res.redirect('/securitybox/'+id);
    });
});

router.get('/editar-cuenta/:id/:idCuenta',(req, res) =>{ 
    let id = req.params.id;
    let idCuenta = req.params.idCuenta;
    conexion.query(`SELECT correoUsuario, AES_DECRYPT(c.contraseña, "superSB") as contraseña, idsitio, (SELECT nombre FROM Sitio 
                                    WHERE idsitio=c.idsitio) Sitio, 
                                (SELECT url FROM Sitio 
                                    WHERE idsitio=c.idsitio) url FROM Cuentas c
                    WHERE SHA2(c.idSB, 224)="${id}" AND SHA2(c.idcuenta, 224)="${idCuenta}"`, (error, result) => {
                        conexion.query(`SELECT * FROM Sitio WHERE SHA2(idSB, 224) = "${id}"`, (error2, sitios) => {
                            console.log(result[0]);
                            res.render('editarCuenta', {id:id, idCuenta:idCuenta, cuenta:result[0], sitios:sitios});
                        });
                        
                    });
});

router.get('/eliminar-cuenta/:cuenta', (req, res)=>{
    const cuenta = req.params.cuenta;
    conexion.query(`DELETE FROM Cuentas WHERE SHA2(idcuenta, 224) = "${cuenta}"`);
});

router.post('/actualizar-cuenta/:id/:idCuenta', (req, res) => {
    const id = req.params.id;
    const idCuenta = req.params.idCuenta;
    const idsitio = req.body.sitioCambiar;
    const correoUser = req.body.userCambiar;
    const contraseña = req.body.passCambiar;
    conexion.query(`UPDATE Cuentas SET idsitio=${idsitio}, correoUsuario='${correoUser}', contraseña = AES_ENCRYPT('${contraseña}', "superSB") WHERE SHA2(idcuenta, 224)="${idCuenta}"`, (error, result)=>{
        res.redirect('/securitybox/'+id);
    });
});

router.post('/actualizar-sitio/:idsitio', (req, res) => {
    const idsitio = req.params.idsitio;
    const nombre = req.body.nombre;
    const url = req.body.url;
    conexion.query(`UPDATE Sitio SET nombre='${nombre}', url='${url}' WHERE idsitio=${idsitio}`)
});

router.get('/eliminar-sitio/:idsitio', (req, res) => {
    const idsitio = req.params.idsitio;
    conexion.query(`DELETE FROM Cuentas WHERE idsitio=${idsitio}`);
    conexion.query(`DELETE FROM Sitio WHERE idsitio=${idsitio}`);
});

router.get('/cuenta/:id', (req, res)=>{
    let id = req.params.id;
    conexion.query(`SELECT *, AES_DECRYPT(contraseña, "superSB") contraseña FROM CuentaSB NATURAL JOIN Usuario WHERE SHA2(idSB, 224) = "${id}"`, (e, r)=>{
        console.log(r[0]);
        conexion.query(`CALL buscarImg("${id}")`, (err, result) => {
            let resultado  = Object.values(JSON.parse(JSON.stringify(result[0])));
            let ruta = resultado.length == 0 ? '/fotosPerfil/defecto.jpg' : resultado[0].nombre;
            res.render('cuenta', {id:id, datos:r[0], img:ruta});
        })
    });
});

router.post('/guardar-cambios/:id', (req, res) => {
    const id = req.params.id;
    const nombre1 = req.body.nombre1;
    const nombre2 = req.body.nombre2;
    const apellido1 = req.body.apellido1;
    const apellido2 = req.body.apellido2;
    const documentos = req.body.documentos;
    const nDocumento = req.body.nDocumento;
    const fecha = req.body.fecha;
    const genero = req.body.genero;
    const contraseña = req.body.contraseña;
    conexion.query(`UPDATE Usuario SET nombre1 = '${nombre1}', nombre2 = '${nombre2}', apellido1 = '${apellido1}', apellido2 = '${apellido2}', tipoDocumento = '${documentos}', fechaNa = '${fecha}', genero = '${genero}' WHERE nDocumento = ${nDocumento}`);
    conexion.query(`UPDATE CuentaSB SET contraseña = AES_ENCRYPT('${contraseña}', "superSB") WHERE SHA2(idSB, 224) = "${id}"`);
    res.redirect('/cuenta/'+id);
});

router.post('/cargar/:id', (req, res)=>{
    const id = req.params.id;
    const file = req.file.originalname;
    let ruta = '/fotosPerfil/'+file;
    console.log(ruta);
    conexion.query(`INSERT INTO ImagenPerfil (nombre) values ('${ruta}')`); 
    conexion.query(`SELECT MAX(idImg) idImagen FROM ImagenPerfil;`, (error, result) => {
        console.log(result[0]);
        let idImg = result[0].idImagen;
        console.log(idImg);
        conexion.query(`UPDATE CuentaSB SET idImg = ${idImg} WHERE SHA2(idSB, 224) = "${id}"`, (e, r)=>{
            res.redirect('/cuenta/'+id);
        })
    });
});

router.get('/eliminar/:id', (req, res) => {
    const id = req.params.id;
    conexion.query(`CALL eliminarCuentaSB("${id}")`, (error, result) => {
        res.redirect('/');
    });
});

module.exports = router;