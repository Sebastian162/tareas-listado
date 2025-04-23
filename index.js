require('colors');
const {inquirerMenu, pausa,leerInput} = require('./helpers/inquirer')
const Tareas = require('./models/tareas');


const main = async() => {
    let opt = '';
    const tareas = new Tareas();

    do{
        opt = await inquirerMenu();

        switch(opt){
            case '1':
                const desc = await leerInput('Descripçión:')
                tareas.crearTarea(desc);
            break;
            case '2':
                tareas.listadoCompleto();
        }


        await pausa();
    } while (opt !== '0');
}

main();