var selectedFile;

// Get a reference to the database service
var firebaseRef = firebase.database().ref();


$("#fileName").on("change",function(event){
			 var fileInput = document.querySelector('#fileName');
    var filePath = fileInput.value;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if(!allowedExtensions.exec(filePath)){
        alert('Please upload file having extensions .jpeg/.jpg/.png/.gif only.');
        fileInput.value = '';
        return false;
    }else{
       			selectedFile=event.target.files[0];  
    }
});

function uploadData(){

	var photo_url;
	var description = $("#description").val();
	var item_category= $("#item_category").val();
	var sub_category= $("#sub_category").val();
	var ingredients =$("#ingredients").val();
	
	if(validate()){
			progressLoader();
			var uploadTask =firebase.storage().ref('/images/'+selectedFile.name).put(selectedFile);
				uploadTask.on('state_changed', function(snapshot){
							// Observe state change events such as progress, pause, and resum
					}, function(error) {
						 	// Handle unsuccessful uploads
						 	alert(error.message);
					}, function() {
							// Handle successful uploads on complete
							// For instance, get the download URL: https://firebasestorage.googleapis.com/...
							var downloadURL = uploadTask.snapshot.downloadURL;
							var restDish;
							
										var restDish = {
										    // photo_url : downloadURL,
										    description: description,
										    item_category: item_category,
										    sub_category: sub_category							
										};	
					
							var firebaseRef=firebase.database().ref();	
					firebaseRef.on("value", function(snapshot) {
  console.log(snapshot.val());
  console.log(restDish);
  console.log("HELLO"+downloadURL+"changed"+uploadTask);

}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
							firebaseRef.child("topics").push().set(restDish);
							$("#myForm")[0].reset();
							alert("data uploaded successfully");
						});

		}//else{
				return false;
		//}

}


function validate(){
	var description = $("#description").val();
	var item_category= $("#item_category").val();
	var sub_category= $("#sub_category").val();

	if(selectedFile === undefined || selectedFile == null ){
		alert("please upload image file!");
		return false;
	}

	if(description === undefined || description == null || description.trim().length <= 0){
		alert("please enter description");
		return false;
	}
	if(item_category === undefined || item_category == null || item_category.trim().length <= 0){
		alert("please enter item_category");
		return false;
	}
	if(sub_category === undefined || sub_category == null || sub_category.trim().length <= 0){
		alert("please enter sub_category");
		return false;
	}
	
	return true;
}


function progressLoader(){
	 var elem = document.querySelector("#myBar");
  document.querySelector(".w3-light-grey").style.display="block";
  var width = 20;
  var id = setInterval(frame, 40);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
        document.querySelector(".w3-light-grey").style.display="none";
    } else {
      width++; 
      elem.style.width = width + '%'; 
    }
  }
}


function isnum(str){
  return /^[0-9]*$/.test(str);
}