'usestrict';

const fs        = require( 'fs' );
const path      = require( 'path' );
const modelsDir = path.join( __dirname, '../schemas/create_users' );
const models    = fs.readdirSync( models );

module.exports.init = server => {
    returnnewPromise( ( resolve, reject ) => {
        server.register({
            register: require( 'k7' ),
            options: {
                connectionString: 'mongodb://localhost:8080/hapi',
                adapter: require( 'k7-mongoose' ),
                models: [path.join( routeDir, '**/*.js' )],
            }
        }, err => {
            if ( err ) {
                reject( err );
                return;
            }
            resolve();
        });
    });
};