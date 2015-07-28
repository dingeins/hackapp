$('#uploadBtn').change(function(){
	var binaryReader = new FileReader();
	var base64Reader = new FileReader();
	
	binaryReader.readAsBinaryString(this.files[0]);
	base64Reader.readAsDataURL(this.files[0]);
	
	base64Reader.onloadend = function(event){
		$('#uploadedImage').attr('src', event.target.result);
		$('#face1').attr('display',block);
		$('#face2').attr('display',block);
	}
	binaryReader.onloadend = function(event){
		$.ajax({
			type: "POST",
			url: '/analyze',
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

$('#findMoreBtn').click(function(){
	$('#diy').attr('style', 'display: block;');
	$('#results').attr('style', 'display: none;');
});

$('#backBtn').click(function(){
	$('#results').attr('style', 'display: block;');
	$('#diy').attr('style', 'display: none;');
});

$('#tryAnotherBtn2').click(function(){
	$('#select-image').attr('style', 'display: block;');
	$('#diy').attr('style', 'display: none;');
});