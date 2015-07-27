$('#uploadBtn').change(function(){
	var binaryReader = new FileReader();
	var base64Reader = new FileReader();
	
	binaryReader.readAsBinaryString(this.files[0]);
	base64Reader.readAsDataURL(this.files[0]);
	
	base64Reader.onloadend = function(event){
		$('#uploadedImage').attr('src', event.target.result);
	}
	binaryReader.onloadend = function(event){
		$.ajax({
			type: "POST",
			url: '/analyze',
			// data: JSON.stringify({"user": "me"}),
			// contentType: 'application/json',
			data: event.target.result,
			contentType: 'application/octet-stream',
			success: function(data){
				alert(data);
			},
		});
	}
	
	$('#select-image').attr('style', 'display: none;');
	$('#results').attr('style', 'display: block;');
});

$('#tryAnotherBtn').click(function(){
	$('#select-image').attr('style', 'display: block;');
	$('#results').attr('style', 'display: none;');
});