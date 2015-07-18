var bodyParser = require('koa-bodyparser');
var cors = require('koa-cors');
var koa = require('koa');
var kroute = require('kroute');
var logger = require('winston');
var requireDir = require('require-dir');

logger.level = 'debug';

var middleware = requireDir('./middleware');
var app = koa();
var router = kroute();

router.get('/index', middleware.getIndex);
router.get('/free', middleware.getIndex);

app.use(cors({ headers: 'accept, authorization, content-type' }));
app.use(middleware.onError);
app.use(middleware.authorize); // optional
app.use(middleware.parseRawBody); // optional
app.use(bodyParser());
app.use(router);

console.log('Starting with ENV');
console.log('APP_ENV_VAR', process.env.APP_ENV_VAR);

app.listen(4000);
