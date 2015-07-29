$('#uploadBtn').change(function () {
	$.cookie('session', null);
	window.cookie = null;
	
	var binaryReader = new FileReader();
	var base64Reader = new FileReader();

	base64Reader.onloadend = function () {
		$('#uploadedImage').attr('src', base64Reader.result);
	}
	binaryReader.onloadend = function () {
		$.ajax({
			type: "POST",
			url: '/analyze',
			data: binaryReader.result,
			contentType: 'application/octet-stream',
			success: function (data) {
				$('#loadingImage').attr('style', 'display: none;');
				
				var faces = JSON.parse(data);

				window.face0Left = faces[0].faceRectangle.left;
				window.face0Top = faces[0].faceRectangle.top;
				window.face0Width = faces[0].faceRectangle.width;
				window.face0Height = faces[0].faceRectangle.height;
				window.face1Left = faces[1].faceRectangle.left;
				window.face1Top = faces[1].faceRectangle.top;
				window.face1Width = faces[1].faceRectangle.width;
				window.face1Height = faces[1].faceRectangle.height;

				var image = document.getElementById('uploadedImage');
				var imageWidth = image.clientWidth;
				var imageHeight = image.clientHeight;
				var imageNaturalWidth = image.naturalWidth;
				var imageNaturalHeight = image.naturalHeight;

				var div = document.getElementById('resultDiv');
				var divWidth = div.clientWidth;
				var divHeight = div.clientHeight;

				var left0 = (divWidth - imageWidth) / 2 + window.face0Left * imageWidth / imageNaturalWidth;
				var left1 = (divWidth - imageWidth) / 2 + window.face1Left * imageWidth / imageNaturalWidth;
				var top0 = (divHeight - imageHeight) / 2 + window.face0Top * imageHeight / imageNaturalHeight;
				var top1 = (divHeight - imageHeight) / 2 + window.face1Top * imageHeight / imageNaturalHeight;

				$('#rect1').attr('style', 'left: ' + left0 + 'px; top: ' + top0 + 'px; width: ' + window.face0Width * imageWidth / imageNaturalWidth + 'px; height: ' + window.face0Height * imageHeight / imageNaturalHeight + 'px; border: 1px solid white; position: absolute;');
				$('#rect2').attr('style', 'left: ' + left1 + 'px; top: ' + top1 + 'px; width: ' + window.face1Width * imageWidth / imageNaturalWidth + 'px; height: ' + window.face1Height * imageHeight / imageNaturalHeight + 'px; border: 1px solid white; position: absolute;');

				var tagLeft1 = left0 + window.face0Width / 2 * imageWidth / imageNaturalWidth - 41;
				var tagLeft2 = left1 + window.face1Width / 2 * imageWidth / imageNaturalWidth - 41;
				var tagTop1 = top0 - 85;
				var tagTop2 = top1 - 85;

				$('#tag1').attr('style', 'left: ' + tagLeft1 + 'px; top: ' + tagTop1 + 'px; position: absolute; display: block;');
				$('#tag2').attr('style', 'left: ' + tagLeft2 + 'px; top: ' + tagTop2 + 'px; position: absolute; display: block;');
			},
		});
	}

	base64Reader.readAsDataURL(this.files[0]);
	binaryReader.readAsBinaryString(this.files[0]);

	$('#select-image').attr('style', 'display: none;');
	$('#results').attr('style', 'display: block;');
});

$('#tryAnotherBtn').click(function () {
	$('#uploadBtn').attr('value', '');
	$('#loadingImage').attr('style', 'display: block;');
	$('#rect1').attr('style', 'display: none;');
	$('#rect2').attr('style', 'display: none;');
	$('#tag1').attr('style', 'display: none;');
	$('#tag2').attr('style', 'display: none;');
	$('#select-image').attr('style', 'display: block;');
	$('#results').attr('style', 'display: none;');
});

$('#findMoreBtn').click(function () {
	$('#diy').attr('style', 'display: block;');
	$('#results').attr('style', 'display: none;');
});

$('#backBtn').click(function () {
	$('#results').attr('style', 'display: block;');
	$('#diy').attr('style', 'display: none;');
});

$('#tryAnotherBtn2').click(function () {
	$('#uploadBtn').attr('value', '');
	$('#select-image').attr('style', 'display: block;');
	$('#diy').attr('style', 'display: none;');
});

$(window).resize(function () {
	var image = document.getElementById('uploadedImage');
	var imageWidth = image.clientWidth;
	var imageHeight = image.clientHeight;
	var imageNaturalWidth = image.naturalWidth;
	var imageNaturalHeight = image.naturalHeight;

	var div = document.getElementById('resultDiv');
	var divWidth = div.clientWidth;
	var divHeight = div.clientHeight;

	var left0 = (divWidth - imageWidth) / 2 + window.face0Left * imageWidth / imageNaturalWidth;
	var left1 = (divWidth - imageWidth) / 2 + window.face1Left * imageWidth / imageNaturalWidth;
	var top0 = (divHeight - imageHeight) / 2 + window.face0Top * imageHeight / imageNaturalHeight;
	var top1 = (divHeight - imageHeight) / 2 + window.face1Top * imageHeight / imageNaturalHeight;

	$('#rect1').attr('style', 'left: ' + left0 + 'px; top: ' + top0 + 'px; width: ' + window.face0Width * imageWidth / imageNaturalWidth + 'px; height: ' + window.face0Height * imageHeight / imageNaturalHeight + 'px; border: 1px solid white; position: absolute;');
	$('#rect2').attr('style', 'left: ' + left1 + 'px; top: ' + top1 + 'px; width: ' + window.face1Width * imageWidth / imageNaturalWidth + 'px; height: ' + window.face1Height * imageHeight / imageNaturalHeight + 'px; border: 1px solid white; position: absolute;');

	var tagLeft1 = left0 + window.face0Width / 2 * imageWidth / imageNaturalWidth - 41;
	var tagLeft2 = left1 + window.face1Width / 2 * imageWidth / imageNaturalWidth - 41;
	var tagTop1 = top0 - 85;
	var tagTop2 = top1 - 85;

	$('#tag1').attr('style', 'left: ' + tagLeft1 + 'px; top: ' + tagTop1 + 'px; position: absolute; display: block;');
	$('#tag2').attr('style', 'left: ' + tagLeft2 + 'px; top: ' + tagTop2 + 'px; position: absolute; display: block;');
});