document.addEventListener("DOMContentLoaded", attachListeners);

function attachListeners(){
    document.querySelector('.login_form')?.addEventListener('submit', register)
}


function register(event){
    event.preventDefault();

    if(document.getElementById('password').value!=document.getElementById('confirm_password').value){
        document.getElementById('error_log').innerHTML= "Passwords must match!"
        return
    }

    var form = new FormData(document.getElementById('create_account'))
    const values = [...form.entries()]
   

    fetch('/user/register',{
        method:"POST",
        headers:{"Content-Type":"application/json", },
        body: JSON.stringify(values)
    }).then(response => {
        if(!response.ok){
            return response.json().then(data=>document.getElementById('error_log').innerHTML = data.msg)
        }else{
            return response.json().then(
                window.location = 'login.html'
            )
        }
 
    })

}


