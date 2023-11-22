var selectedRow = null;
//Mostrar las alertas

function showAlert(message,className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`; 

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(()=> document.querySelector(".alert").remove(), 3000);
}

//Limpar los campos
function clearFields(){
 document.querySelector("#nombre").value ="";
 document.querySelector("#apellido").value ="";
 document.querySelector("#matricula").value ="";
 document.querySelector("#nota").value ="";
}

//Añadir estudiante
document.querySelector("#student-form").addEventListener("submit", (e)=>{
    e.preventDefault();

    //Get para los textfields
    const nombre = document.querySelector("#nombre").value;
    const apellido = document.querySelector("#apellido").value;
    const matricula = document.querySelector("#matricula").value;
    const nota = document.querySelector("#nota").value;

    //Validación
    if(nombre == ""|| apellido == ""|| matricula == ""|| nota == ""){
        showAlert("Please fill in all Fields", "danger");
    }
    else{
        if(selectedRow == null){
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");
            row.innerHTML =` 
                <td>${nombre}</td>
                <td>${apellido}</td>
                <td>${matricula}</td>
                <td>${nota}</td>
                <td>  
                <a href="#" class="btn btn-warning btn-sm edit">Editar</a>
                <a href="#" class="btn btn-danger btn-sm delete">Borrar</a>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Student Added", "success")
        }    

        clearFields();
    }

    //Editar datos
    document.querySelector("#student-list").addEventListener("click", function(e) {
        if (e.target.classList.contains("edit")) {
            selectedRow = e.target.parentElement.parentElement;
            document.querySelector("#nombre").value = selectedRow.children[0].textContent;
            document.querySelector("#apellido").value = selectedRow.children[1].textContent;
            document.querySelector("#matricula").value = selectedRow.children[2].textContent;
            document.querySelector("#nota").value = selectedRow.children[3].textContent;
        }
    });
    


    //Eliminar datos
    document.querySelector("#student-list").addEventListener("click", function(e) {
        if (e.target.classList.contains("delete")) {
            const confirmation = confirm("¿Estás seguro de que deseas eliminar este estudiante?");
            if (confirmation) {
                const row = e.target.parentElement.parentElement;
                row.remove();
                showAlert("Estudiante Eliminado", "Exitoso");
            }
        }
    });



});