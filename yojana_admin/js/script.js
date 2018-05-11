var selectedFile;
var uname=document.querySelector("#txtname");
var upass=document.querySelector("#txtpwd");

// Get a reference to the database service
var firebaseRef = firebase.database().ref();

firebase.auth().onAuthStateChanged(function(user){
	if(user){
		$("#loginProcess").hide();
		$("#restaurantForm").show();
	}
	else{
		$("#loginProcess").show();
		$("#restaurantForm").hide();
	}
});



<<<<<<< HEAD
=======

function submitClick(){
	var email=uname.value;
	var password=upass.value;
	progressLoader();

	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		alert("Error in signing in: "+errorMessage+"\n	Please contact admin!");
		});
	}

	function logoutClick(){
			firebase.auth().signOut().then(function() {
			// Sign-out successful.
			alert("Sign out successful!");
	}).catch(function(error) {
			// An error happened.
			alert("sign out error");
	});
}


>>>>>>> parent of 79c4516... connected to firebase database
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

 	var item_name = $("#item_name").val();
	var item_price = parseInt($("#item_price").val());
	var photo_url;
	var description = $("#description").val();
	var item_category= $("#item_category").val();
	var sub_category= $("#sub_category").val();
	var ingredients =$("#ingredients").val();
	var eta =parseInt($("#eta").val());
	var chef= $("#chef").val();
	var countRadioGroups =parseInt($("#countRadioGroups").val());
	var customizations= $("#customizations").val();

	
	if(validate()){
			progressLoader();
			var uploadTask =firebase.storage().ref('/dishImages/'+selectedFile.name).put(selectedFile);
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
							if(customizations=="no"){
										var restDish = {
										    photo_url :downloadURL,
										    description: description,
										    item_category: item_category,
										    sub_category: sub_category							
										};	
<<<<<<< HEAD
					
=======
									}else{
										var restDish = {
										    item_name: item_name,
										    item_price: item_price,
										    photo_url :downloadURL,
										    description: description,
										    item_category: item_category,
										    sub_category: sub_category,
										    ingredients: ingredients,
										    eta: eta,
										    chef: chef,
										    countRadioGroups: 1,
										    customization01: customizations
										};	
									}
							
							//alert(JSON.stringify(restDish));
>>>>>>> parent of 79c4516... connected to firebase database
							var firebaseRef=firebase.database().ref();	
							firebaseRef.child("menus").push().set(restDish);
							$("#myForm")[0].reset();
							alert("data uploaded successfully");
						});

		}//else{
				return false;
		//}

}


function validate(){

	var item_name = $("#item_name").val();
	var item_price = parseInt($("#item_price").val());
	var description = $("#description").val();
	var item_category= $("#item_category").val();
	var sub_category= $("#sub_category").val();
	var ingredients =$("#ingredients").val();
	var eta =parseInt($("#eta").val());
	var chef= $("#chef").val();
	var countRadioGroups =parseInt($("#countRadioGroups").val());
	var customizations= $("#customizations").val();

	if(item_name === undefined || item_name == null || item_name.trim().length <= 0){
		alert("please enter item_name");
		return false;
	}
	if(item_price === undefined || item_price == null || item_price.length <= 0){
		alert("please enter item_price");
		return false;
	}
	if(isNaN(item_price) || !isnum(item_price)){
		alert("please enter price in number format");
		return false;
	}

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
	if(ingredients === undefined || ingredients == null || ingredients.trim().length <= 0){
		alert("please enter ingredients");
		return false;
	}

	if(eta === undefined || eta == null || eta.length <= 0){
		alert("please enter eta");
		return false;
	}
	if(isNaN(eta)){
		alert("please enter eta in number format");
		return false;
	}

	if(chef === undefined || chef == null || chef.trim().length <= 0){
		alert("please enter chef");
		return false;
	}

	
	if(isNaN(eta)){
		alert("please enter eta in number format");
		return false;
	}
	if(eta < 5 || eta>60){
		alert("please enter eta between 5 and 60");
		return false;
	}

	if(customizations === undefined || customizations == null || customizations.trim().length <= 0){
		alert("please enter customizations");
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