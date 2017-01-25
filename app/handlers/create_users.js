/**
 * Created by bromr on 25/01/2017.
 */
let model = new request.server.database.user();

model.set( 'fluid', value );
model.fluid = value;
model.set( {
    "fluid" : value
} );

model.save( (error, saved)=>{
    //Je ne sais pas quoi faire.
} )