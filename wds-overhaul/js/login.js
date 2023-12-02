document.addEventListener("DOMContentLoaded", attachListeners);

function attachListeners(){
    document.getElementById('login_form')?.addEventListener('submit', login)
}


function login(event){
    event.preventDefault()
    var form = new FormData(document.getElementById('login_form'))
    const values = [...form.entries()]
    console.log(values)

    fetch('/user/login',{
        method:"POST",
        headers:{"Content-Type":"application/json", },
        body: JSON.stringify(values)
    }).then(response => {
        if(!response.ok){
            return response.json().then(data=>document.getElementById('error_log').innerHTML = data.msg)
        }else{
            return response.json().then(
                window.location = 'notes.html'
            )
        }
 
    })

}