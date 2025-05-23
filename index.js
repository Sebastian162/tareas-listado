require('colors');
const {
    inquirerMenu,
     pausa,
     leerInput,
      mostrarListadoCheckList,
       listadoTareasBorrar,
        confirmar
    } = require('./helpers/inquirer');
const {
    guardarDB,
    leerDB
    } = require('./helpers/guardarArchivo');
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
            case '3':
                tareas.listarPendientesCompletadas(true);
            break;
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
            case '5':
                const ids = await mostrarListadoCheckList( tareas.listadoArr);
                tareas.toggleCompletadas(ids)
            break;
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr);
                if( id !== '0') {
                    const ok = await confirmar('¿Está seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
            break;
            default:
            break;
        }


        guardarDB( tareas.listadoArr);
        await pausa();
    } while (opt !== '0');
}

main();