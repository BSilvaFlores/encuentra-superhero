$(document).ready(function () {

    $('button').on('click', function () {
        $('.main').css('display', 'none');

        var textoIngresado = $('input').val();

        $.ajax({//funcion ajax
            type: "GET",//obtener
            url: "https://www.superheroapi.com/api.php/4905856019427443/" + textoIngresado,//url de la api
            dataType: "json",//tipo de archivo json
            success: function (datosApi) {//funcion para ver los datos 

                var validacion = /[0-9]/gim;

                if (textoIngresado.match(validacion) && datosApi.id == textoIngresado) {
                    $('.img').append(`
                    <div>
                        <img style="max-width: 360px;" src="${datosApi.image.url}"></img>
                    </div>
                    `);

                    $('.resultado').append(`
                    <div>
                        <h1>SuperHero Encontrado</h1>
                            <h2>Nombre: ${datosApi.name}</h2> <hr> 
                                <p>Conexiones: ${datosApi.connections['group-affiliation']}</p> <hr> 
                                <p>Publicado por: ${datosApi.biography.publisher}</p> <hr>
                                <p>Ocupación: ${datosApi.work.occupation}</p> <hr>
                                <p>Primera aparición: ${datosApi.biography['first-appearance']}</p> <hr>
                                <p>Altura: ${datosApi.appearance.height}</p> <hr>
                                <p>Peso: ${datosApi.appearance.weight}</p> <hr>
                                <p>Alianzas: ${datosApi.biography.aliases}</p>
                    
                    
                    </div>
                    `);

                    console.log(datosApi);//por consola
                } else {
                    alert("Debe escribir un número, o el número ingresado es mayor al rango(1 - 732)");
                }




                var options = {
                    title: {
                        text: `Estadísticas para ${datosApi.name}`
                    },
                    theme: "light2",
                    animationEnabled: true,
                    data: [{
                        type: "pie",
                        startAngle: 40,
                        toolTipContent: "<b>{label}</b>: ({y})",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} ({y})",
                        dataPoints: [
                            { y: datosApi.powerstats.intelligence, label: "intelligence" },
                            { y: datosApi.powerstats.strength, label: "strength" },
                            { y: datosApi.powerstats.speed, label: "speed" },
                            { y: datosApi.powerstats.durability, label: "durability" },
                            { y: datosApi.powerstats.power, label: "power" },
                            { y: datosApi.powerstats.combat, label: "combat" },


                        ]
                    }]

                };
                $("#chartContainer").CanvasJSChart(options);


            },
            error: function (error) {//error por consola
                console.log(error);
            },
        });
    });



});













