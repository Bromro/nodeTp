'use strict';

module.exports.add = ( request, response ) => {
    let user = new request.server.database.user( request.payload );

    user.save( ( err )=> {
        if ( err ) {
            response( null,  {
                result : err
            } );
            return;
        }

        response( null,  {
            result : user
        } );
    } );
};

module.exports.getUsers = ( request, response ) => {
    request.server.database.user.find({}, function( err, users ) {
        var userMap = {};

        users.forEach( function( user ) {
            userMap[user._id] = user;
        });

        response( null,  {
            result : userMap
        } );
    } );
};

module.exports.delUser = ( request, response ) => {
    request.server.database.user.remove( { _id: request.params.id }, function ( err, res ) {
        if ( err ) return err;
        response( null,  {
            result : res
        } );
    });
};

module.exports.updateUser = ( request, response ) => {
    let data = JSON.parse( request.payload )

    request.server.database.update(
        { login: data.login },
        { password: data.password },
        { email: data.email },
        { firstname: data.firstname },
        { nir: data.nir },
        function ( err, raw ) {
            if( err ) return handleError( err );
        }
    )
};