
const inputName=document.getElementById('input-name');
const inputPin=document.getElementById('input-pin');

const loginBtn = () =>{
    const name =inputName.value;
    const pin =inputPin.value;

    if(name==="admin" & pin==="admin123"){
        alert('Login successful');
        
        window.location.assign("/home.html");
    }
    else{
        alert('Login Fail');
    }
}
