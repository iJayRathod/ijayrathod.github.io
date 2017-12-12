$(".fa-plus").on("click",function(){
$("#todoInput").slideToggle("slow");
$("#todoInput").focus();
$("#todoInput").val("");
	
});

$("#todoInput").keypress(function(event){
if (event.which == 13) {
		var addTodoText = $(this).val();
		console.log(addTodoText.length);
		if(addTodoText.length>36){
			alert("Todo list size should be less than 33 characters!");
			return;
		}
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
	var headingContent = prompt("Enter To Do List Heading for your reference", "New ToDo List");
	if (!headingContent)
	{
		headingContent = "To Do List";
	}
	if (headingContent.length > 13) {
			alert("Heading size should be less than 15 characters!");
			return;
	}
	$("#headerText").text(headingContent);

});