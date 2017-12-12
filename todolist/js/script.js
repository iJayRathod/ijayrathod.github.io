$(".fa-plus").on("click",function(){
$("#todoInput").slideToggle("slow");
$("#todoInput").focus();
$("#todoInput").val("");
	
});

$("#todoInput").keypress(function(event){
if (event.which == 13) {
		var addTodoText = $(this).val();
		console.log(addTodoText);
		$(this).val("");
		if(!addTodoText){
			return;	
		}
		$("ul").append("<li><span class='bin'><i class='fa fa-trash'></i></span> "+addTodoText+"</li>");}
	
});

$("ul").on("click", "li", function() {
	$(this).toggleClass("done");	
});

$("ul").on("click", "span", function(event) {
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();
});

$(".fa-question-circle").on("click",function(){
alert("Don't ask us to clean your shit!!");
});

$(".fa-pencil").click(function() {
	var headingContent = prompt("Enter To Do List Heading for your reference", "To Do List 1");
	if (!headingContent)
	{
		headingContent = "To Do List";
	}
	$("#headerText").text(headingContent);

});