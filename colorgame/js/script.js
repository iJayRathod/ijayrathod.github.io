var easyBtn = document.querySelector("#easybtn");
var hardBtn = document.querySelector("#hardbtn");
var newGame = document.querySelector("#newgame");
var numColors =6;
var tilesColorArr= randomColorGenerator(numColors);
var tiles = document.querySelectorAll(".tile");
var result = document.querySelector("#result");
setSquaresColor(tiles, tilesColorArr);
var header = document.querySelector("#header");



var targetColor = pickFromColor();
console.log("target color:L "+targetColor);
var originalColor = document.querySelector("#originalColor");
originalColor.textContent = targetColor;

function pickFromColor()
{
	var randomNumber = Math.floor(Math.random() * tilesColorArr.length);
	return tilesColorArr[randomNumber];
}


function randomColorGenerator(no){
 var arr = [];
for (var i=0; i < no; i++) {
	var red = Math.round(Math.random() * 256);
	var green = Math.round(Math.random() * 256);
	var blue = Math.round(Math.random() * 256);

	arr.push("rgb("+red+", "+green+", "+blue+")");
	console.log(arr);
	}
return arr;
}

var class2 = document.querySelector("#class2");

easybtn.addEventListener("click",function(){
	class2.style.display = "none";
	easybtn.style.backgroundColor = "steelblue"
	easybtn.style.color = "white";
	hardbtn.style.backgroundColor = "white";
	hardbtn.style.color = "black";

	numColors = 3;
	tilesColorArr = randomColorGenerator(numColors);
	targetColor = pickFromColor();
	originalColor.textContent = targetColor;
	setSquaresColor(tiles, tilesColorArr);
	header.style.backgroundColor = "steelblue";
		if (newGame.textContent == "Play Again?")
	{
		newGame.textContent = "New Game";
	}
	result.textContent = "";
});



hardbtn.addEventListener("click",function(event){
	class2.style.display = "block";
	hardbtn.style.backgroundColor = "steelblue";
	hardbtn.style.color = "white";
	easybtn.style.backgroundColor = "white";
	easybtn.style.color = "black";

	numColors = 6;
	tilesColorArr = randomColorGenerator(numColors);
	targetColor = pickFromColor();
	originalColor.textContent = targetColor;
	setSquaresColor(tiles,tilesColorArr);
	header.style.backgroundColor = "steelblue";
	if (newGame.textContent == "Play Again?")
	{
		newGame.textContent = "New Game";
	}

	result.textContent = "";
});

newGame.addEventListener("click", function(event){
	tilesColorArr = randomColorGenerator(numColors);
	targetColor = pickFromColor();
	originalColor.textContent = targetColor;
	setSquaresColor(tiles, tilesColorArr);
	header.style.backgroundColor = "steelblue";
	if (newGame.textContent == "Play Again?")
	{
		newGame.textContent = "New Game";
	}
	result.textContent = "";
});


function setSquaresColor(tiles, tilesColorArr)
{
	for (var index = 0; index < tiles.length; index++)
	{
		tiles[index].style.backgroundColor = tilesColorArr[index];

		tiles[index].addEventListener("click", function(event){
		var clickedColor = this.style.backgroundColor;
		if (clickedColor === targetColor) {
			result.textContent = "Correct!";
			gameOver(targetColor);
			newGame.textContent = "Play Again?";
			
		}
		else
		{
			this.style.backgroundColor = "#232323";
			result.textContent = "Try Again!";
		}
		});
	}
}

function gameOver(color)
{

	for (var index = 0; index < tilesColorArr.length; index++)
	{
		tiles[index].style.backgroundColor = color;
	}
	header.style.backgroundColor = color;

}