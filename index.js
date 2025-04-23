require('colors');
const {inquirerMenu, pausa,leerInput} = require('./helpers/inquirer');
const {guardarDB,leerDB} = require('./helpers/guardarArchivo');
const Tareas = require('./models/tareas');


const main = async() => {
    let opt = '';

    const tareas = new Tareas();

    const tareasDB = leerDB();

    if ( tareasDB ) {
        tareas.cargarTareasFromArray( tareasDB );
    }

    do{
        opt = await inquirerMenu();

        switch(opt){
            case '1':
                //Crear tarea
                const desc = await leerInput('Descripçión:')
                tareas.crearTarea(desc);
            break;
            case '2':
                //Listar tareas
                tareas.listadoCompleto();
            break;


            case '5':
                //Completar tarea
            break;

            default:
            break;
        }


        guardarDB( tareas.listadoArr);
        await pausa();
    } while (opt !== '0');
}

main();