'use strict';

let you=0, computador=0;
let arrayBoard=[]

function showModal() {
  let coverDiv = document.createElement('div');
  coverDiv.id = 'cover-div';
  document.body.style.overflowY = 'hidden';         //fazer com que a pagina bloquei e não seja possivel fazer scroll
  document.body.append(coverDiv);                   //Adicionar o estilo ao codigo
}

function removeModal() {
  document.getElementById('cover-div').remove();    //Remover o estilo que adicionamos previamente
  document.body.style.overflowY = '';
  document.onkeydown = null;
}

//Verificar e efetuar o login
function checkLogin() {
  let container = document.getElementById('prompt-form-container');     //A modal como um todo
  let form = document.getElementById('prompt-form');                    //A parte do formulario da modal
  container.style.display = 'block';
  form.elements.text.focus();

  document.querySelector('.btnCancel').onclick = function() { 
    removeModal();
    document.getElementById('prompt-form-container').style.display = 'none';   //Remover a modal
  };

  document.onkeydown = function(e) { 
    if (e.key == 'Escape') {
      removeModal();
      document.getElementById('prompt-form-container').style.display = 'none';   //Remover a modal
    } 
  };

  document.querySelector('.btnSubmitLogin').onclick = function() {
    let user = document.querySelector('.txtUsername').value;
    let pass = document.querySelector('.txtPassword').value;

    //Se o username e a password tiverem conteudo
    if (user != '' && pass != ''){
      removeModal();
      document.getElementById('prompt-form-container').style.display = 'none';   //Remover a modal
      document.querySelector('.btnAuth').innerHTML = "Bem Vindo "+user;
    }else
      alert("Dados incorretos ou em falta");
  };
}

//Mostar instruções
function showHelp() {
  let container = document.getElementById('modal-help-container');     //A modal como um todo
  container.style.display = 'block';                                  //Block - mostra, none - invisel

  document.querySelector('.btnCancelHelp').onclick = function() {
    removeModal();
    container.style.display = 'none';   //Remover a modal
  };
  document.onkeydown = function(e) { 
    if (e.key == 'Escape') {
      removeModal();
      container.style.display = 'none';   //Remover a modal
    } 
  };
}

//Mostar score
function showScore() {
  let container = document.getElementById('modal-score-container');     //A modal como um todo
  let myTable = document.querySelector('.myTable');
  container.style.display = 'block';

  myTable.innerHTML='';                                                 //Apaga o codigo html que esta dentro do myTable

  let tr1 = document.createElement('tr');
  let tr2 = document.createElement('tr');

  let td1 = document.createElement('td');
  let td2 = document.createElement('td');
  let td3 = document.createElement('td');
  let td4 = document.createElement('td');

  td1.appendChild(document.createTextNode("Voce"));
  td2.appendChild(document.createTextNode(you.toString()))
  td3.appendChild(document.createTextNode("Computador"));
  td4.appendChild(document.createTextNode(computador.toString()))

  tr1.appendChild(td1); 
  tr1.appendChild(td2);

  tr2.appendChild(td3);
  tr2.appendChild(td4);

  myTable.appendChild(tr1)
  myTable.appendChild(tr2)
  
  document.querySelector('.btnCancelScore').onclick = function() {
    removeModal();
    container.style.display = 'none';   //Remover a modal
  };
  document.onkeydown = function(e) { 
    if (e.key == 'Escape') {
      removeModal();
      container.style.display = 'none';   //Remover a modal
    } 
  };
}

//Ajustar jogo por defenição
function setByDefault() {
  if(arrayBoard.length!=0)
    alert("Voce desistiu")

  document.querySelector('.btnStartEnd').innerHTML = 'Começar a Jogar';

  document.querySelector('.game').style.display = "none";

  document.querySelector('#logo').style.display = "block";

  document.querySelector('#panel-config').style.display = "block";

  document.querySelector('.boardType').value = 5;
  document.querySelector('.aiLevel').value = 1;
  
  let whoIsTheOpponent = document.getElementsByName('whoIsTheOtherPlayer');
  let whoPlaysFirst = document.getElementsByName('whoPlayFirst');

  whoIsTheOpponent[0].checked = false;
  whoIsTheOpponent[1].checked = true;
  
  whoPlaysFirst[0].checked = true;
  whoPlaysFirst[1].checked = false;
}

function startBoard(){
  let buttonStart = document.querySelector('.btnStartEnd');
  let board = document.querySelector('.game');
  let logo = document.querySelector('#logo');
  let panelConfig = document.querySelector('#panel-config');
  let boardType = document.querySelector('.boardType').value; 

  buttonStart.innerHTML = 'Desistir';
  logo.style.display = "none";
  panelConfig.style.display = "none";
  board.style.display = "block";
  
  board.innerHTML= "";

  //for(inicialização; condição; incrementar (++) /decrementar (--))
  //i=6 colunas
  for(let i=0; i<boardType; i++){

    let stack = document.createElement("div")
    stack.setAttribute('class','pilha')
    //Executado para cada coluna
    for (let nOfEmpty = boardType-i-1; nOfEmpty>0; nOfEmpty--){
      //<div class="vazio"> </div>
      let vazio = document.createElement("div");
      vazio.setAttribute('class','vazio');
      stack.appendChild(vazio);
    }

    for (let nDePeças = i+1; nDePeças>0; nDePeças--){
      let peca = document.createElement("div");
      peca.setAttribute('class','peca');
      peca.setAttribute('id',"peca" +    (i+1)    +      nDePeças)


      stack.appendChild(peca);
    
      arrayBoard.push((i+1)+nDePeças.toString())
    }

    board.appendChild(stack)
  }

  return arrayBoard;
}

function makeMovement(dogPressed,arrayBoard){
  document.querySelector("#"+dogPressed).style.visibility='hidden';
  for(let i = parseInt(dogPressed[4]); i>=parseInt(dogPressed[5]); i--){
    document.querySelector("#"+dogPressed.substring(0,5) + i).style.visibility='hidden';
    arrayBoard = arrayBoard.filter(item => item !== dogPressed[4]+i)
  }
  return arrayBoard;
}

function sortAValidNumber(arrayBoard){
  let play1 = arrayBoard[Math.floor(Math.random()*arrayBoard.length)]; //arrayBoard[3] = '32'

  return makeMovement("peca"+play1,arrayBoard)
}

//Quando o botao LOGIN for "clickado",vai executar o procedimento abaixo descrito
document.querySelector('.btnAuth').onclick = function() {
  //Limpar os inputs
  document.querySelector('.txtUsername').value = '';
  document.querySelector('.txtPassword').value = '';
  showModal();
  checkLogin();
};

//Quando o botao Instruções for "clickado",vai executar o procedimento abaixo descrito
document.querySelector('.btnHelp').onclick = function() {
  showModal();
  showHelp();
};

//Quando o botao score for "clickado",vai executar o procedimento abaixo descrito
document.querySelector('.btnScore').onclick = function() {
  showModal();
  showScore();
};

//Quando o botao Instruções for "clickado",vai executar o procedimento abaixo descrito
document.querySelector('.btnStartEnd').onclick = function() {
  let buttonStart = document.querySelector('.btnStartEnd');
  let boardType = document.querySelector('.boardType').value;
  let aiLevel = document.querySelector('.aiLevel').value;
  let whoPlaysFirst = document.getElementsByName('whoPlayFirst');

  if(buttonStart.textContent == 'Começar a Jogar'){
    if(boardType==0 || aiLevel==0)
      alert("Dados em falta, complete as opções acima!");
    else if(document.querySelector('input[name="whoIsTheOtherPlayer"]:checked').value == "human")
      alert("Este oponente apenas sera implementado na proxima fase do projeto!")
    else{
      arrayBoard = startBoard();
      let arrayPeca = document. querySelectorAll(".peca");
      let dogPressed='';
      
      if(whoPlaysFirst[1].checked == true){
        setTimeout(() => {              
          arrayBoard = sortAValidNumber(arrayBoard);
          if(arrayBoard.length == 0){
            alert("Fim de Jogo! O oponente ganhou")
            computador+1;
            setByDefault();
          }
        },500);
      }

      const pecaPressed = e => {
        //Valida jogada
        dogPressed = e.target.id;
        arrayBoard = makeMovement(dogPressed,arrayBoard)
        if(arrayBoard.length == 0){
          alert("Fim de Jogo! Voce ganhou")
          you++;
          setByDefault();
        }else{
          setTimeout(() => {              
            arrayBoard = sortAValidNumber(arrayBoard);
            if(arrayBoard.length == 0){
              alert("Fim de Jogo! O oponente ganhou")
              computador++;
              setByDefault();
            }
          },500);
        }
      }
      
      for (let peca of arrayPeca)
        peca.addEventListener("click", pecaPressed);
    }
  }else
    setByDefault();
};

//Este ficheiro vai ser compilado uma vez quando a pagina é carregada e vai executar esta chamada de função
setByDefault();