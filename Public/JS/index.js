const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem('logged');
const session = localStorage.getItem("session");

checkLogged();

//logar no sistema 

document.getElementById("login-form").addEventListener('submit', function(e){
   e.preventDefault();

   const emailLogin = document.getElementById('email-input').value;
   const passwordLogin = document.getElementById('password-input').value;
   const checkSession = document.getElementById('session-check').checked;

      const account = getAccount(emailLogin);

      if(!account){
         alert('VEREFIQUE USUÁRIO E SENHA.');
         return;
      }

      if(account) {

         if(account.password !== passwordLogin){
            alert('VEREFIQUE USUÁRIO E SENHA.');
            return
         }


         saveSession(emailLogin,checkSession)


         window.location.href = "Home.html";
      }



      

})

//criar conta

document.getElementById('create-form').addEventListener('submit', function(e){
   e.preventDefault();

   const email=document.getElementById('email-create-input').value;
   const password=document.getElementById('password-create-input').value;

   if(email.length < 5){
      alert('E-MAIL INCORRETO!!!!.')
      return;
   }

   if(password.length < 4){
      alert('SUA SENHA TEM QUE CONTER PELO MENOS 4 LETRAS OU NÚMEROS.')
      return;
   }

   saveAccount({
      login: email,
      password: password,
      transactions: [],

   });

   myModal.hide();
   alert('Conta criada com sucesso.')
});

function checkLogged(){
   if(session){
      sessionStorage.setItem('logged',session);

      logged = session
   }
   if(logged){
      saveSession(logged,session);
      window.location.href = "Home.html";
   }
}

function saveAccount(data){
   localStorage.setItem(data.login, JSON.stringify(data) );
}

function saveSession (data, saveSession){
      if(saveSession){
         localStorage.setItem('session', data);
      }

      sessionStorage.setItem("logged",data);
}

function getAccount(key){
   const account = localStorage.getItem(key);

   if(account){
      return JSON.parse(account);
   }

   return'';
}