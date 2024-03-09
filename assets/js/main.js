
$(function() {
    $("#caja").fadeOut();
    $("#chartContainer").fadeOut();

    $("#buscarHero").click(function(e){
        e.preventDefault();

        $("#caja").fadeIn();
        $("#chartContainer").fadeIn();

        const busqueda = $("#boxHero").val();
        let validacionNumero = /^(?:[1-9]|[1-9][0-9]|[1-9][0-9]{2}|[1-7][0-2][0-9])$/;

        if (validacionNumero.test(busqueda)){
            const url =`https://superheroapi.com/api.php/4905856019427443/${busqueda}`;

            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
    
                    $("#espacioImagen").html(`<img src="${data.image.url}" class="img-fluid rounded-start">`);
                    $("#titulo").html(data.name);
                    $("#texto").html(`Conexiones: ${data.connections['group-affiliation']}`);
                    $("#lista").html(
                        `<li class="list-group-item">Publicado por: ${data.biography.publisher}</li>
                        <li class="list-group-item">Ocupación: ${data.work.occupation}</li>
                        <li class="list-group-item">Primera aparición: ${data.biography['first-appearance']}</li>
                        <li class="list-group-item">Altura: ${data.appearance.height[0]} - ${data.appearance.height[1]}</li>
                        <li class="list-group-item">Peso: ${data.appearance.weight[0]} - ${data.appearance.weight[1]}</li>
                        <li class="list-group-item">Alianza: ${data.biography.aliases}</li>`
                        );
                        
                        var dataPoints = [];
                        for (const [estadisticas, valor] of Object.entries(data.powerstats)) {
                            if(valor !== "null"){
                                dataPoints.push({ y: +valor || 0, label: estadisticas });
                            }                           
                        }

                        if(dataPoints.length == 0){
                            $("#chartContainer").html(`<h2 style="padding: 10px;">El Super Hero no tiene estadisticas</h2>`);
                        }else {

                            var chart = new CanvasJS.Chart("chartContainer", {
                                theme: "light2", 
                                exportEnabled: true,
                                animationEnabled: true,
                                title: {
                                    text: `Estadisticas para ${data.name}`
                                },
                                data: [{
                                    type: "pie",
                                    startAngle: 25, 
                                    toolTipContent: "<b>{label}</b>: {y}%",
                                    showInLegend: "true",
                                    legendText: "{label}",
                                    indexLabelFontSize: 16,
                                    indexLabel: "{label} - {y}%",
                                    dataPoints: dataPoints
                                }]
                            });
                            chart.render();                                                   
                        }
                       
                    console.log(data);
                },
                error: function(xhr, status, error) {
                    console.error("Error en la solicitud AJAX: " + status + ", " + error);
                }
            });

        
        } else {
            $("#caja").fadeOut();
            $("#chartContainer").fadeOut();
            alert("Por favor, ingrese solo números del 1 al 731 en la busqueda.");
            
        }
        
    });
    
});