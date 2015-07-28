$('#uploadBtn').change(function(){
	var binaryReader = new FileReader();
	var base64Reader = new FileReader();
	
	base64Reader.onloadend = function(){
		$('#uploadedImage').attr('src', base64Reader.result);
		$('#face1').attr('display',block);
		$('#face2').attr('display',block);
	}
	binaryReader.onloadend = function(){
		$.ajax({
			type: "POST",
			url: '/analyze',
			data: binaryReader.result,
			contentType: 'application/octet-stream',
			success: function(data){
				var faces = JSON.parse(data);
				
				var image = document.getElementById('uploadedImage');
				var imageWidth = image.clientWidth;
				var imageHeight = image.clientHeight;
				
				var div = document.getElementById('resultDiv');
				var divWidth = div.clientWidth;
				var divHeight = div.clientHeight;
				
				var left0 = (divWidth - imageWidth)/2 + faces[0].faceRectangle.left;
				var left1 = (divWidth - imageWidth)/2 + faces[1].faceRectangle.left;
				var top0 = (divHeight - imageHeight)/2 + faces[0].faceRectangle.top;
				var top1 = (divHeight - imageHeight)/2 + faces[1].faceRectangle.top;
				
				$('#rect1').attr('style', 'left: '+left0+'px; top: '+top0+'px; width: '+faces[0].faceRectangle.width+'px; height: '+faces[0].faceRectangle.height+'px; border: 1px solid white; position: absolute;');
				$('#rect2').attr('style', 'left: '+left1+'px; top: '+top1+'px; width: '+faces[1].faceRectangle.width+'px; height: '+faces[1].faceRectangle.height+'px; border: 1px solid white; position: absolute;');
				
				var tagLeft1 = left0 + faces[0].faceRectangle.width/2 - 41;
				var tagLeft2 = left1 + faces[1].faceRectangle.width/2 - 41;
				var tagTop1 = top0 - 85;
				var tagTop2 = top1 - 85;
				
				$('#tag1').attr('style', 'left: '+tagLeft1+'px; top: '+tagTop1+'px; position: absolute; display: block;');
				$('#tag2').attr('style', 'left: '+tagLeft2+'px; top: '+tagTop2+'px; position: absolute; display: block;');
			},
		});
	}
	
	base64Reader.readAsDataURL(this.files[0]);
	binaryReader.readAsBinaryString(this.files[0]);
	
	$('#select-image').attr('style', 'display: none;');
	$('#results').attr('style', 'display: block;');
});

$('#tryAnotherBtn').click(function(){
	$('#rect1').attr('style', 'display: none;');
	$('#rect2').attr('style', 'display: none;');
	$('#tag1').attr('style', 'display: none;');
	$('#tag2').attr('style', 'display: none;');
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
