$('#uploadBtn').change(function(){
	$('#select-image').attr('style', 'display: none;');
	$('#results').attr('style', 'display: block;');
});

$('#tryAnotherBtn').click(function(){
	$('#select-image').attr('style', 'display: block;');
	$('#results').attr('style', 'display: none;');
});