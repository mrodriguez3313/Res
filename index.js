var randomNumber1 = Math.floor(Math.random()*6)+1;
var randomNumber2 = Math.floor(Math.random()*6)+1;
console.log("rn1 "+randomNumber1);
console.log("rn2 "+randomNumber2);
document.querySelector(".img1").src="images/dice"+randomNumber1+".png";
document.querySelector(".img2").src="images/dice"+randomNumber2+".png";
if (randomNumber1 > randomNumber2){
  document.querySelector("#target").innerText="Player1 Wins!";
} else if (randomNumber2 > randomNumber1) {
  document.querySelector("#target").innerText="Player2 Wins!";
} else if (randomNumber1 == randomNumber2) {
  document.querySelector("#target").innerText="Draw!";
}
