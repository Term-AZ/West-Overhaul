document.addEventListener("DOMContentLoaded", checkPage);

const ALLOWEDROUTES = [
    '/notes.html'
]

function checkPage() {
    fetch('/validate/token',{
        method:"GET",
        headers:{"Content-Type":"application/json"},
        credentials: 'include'
    }).then(response=>{
        var x = document.createElement('a')
        x.setAttribute('id', 'user_entry')

        if(response.ok){
            x.appendChild(document.createTextNode("Logout"))
            document.getElementById('user_entry').replaceWith(x)

            if(ALLOWEDROUTES.includes(window.location.pathname)){
                return
            }
            window.location = '../notes.html';
        }else{
            x.appendChild(document.createTextNode("Login"))
            document.getElementById('user_entry').replaceWith(x)
            if(window.location.pathname =='/login.html'){
                return
            }
            window.location = '../login.html';
        }
    })
}