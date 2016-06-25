<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>JSON</title>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
</head>
<body>
	<h1>Json page</h1>
	<button class="get">Get JSON</button>
	<script type="text/javascript">
		$(".get").click(
				function() {

					var searchCriteria = {
						offset : 0,
						itemsPerPage : 5,
						keyword : 'Tu'
					};
					var data = {
						staffName : [ "mkyong1", "mkyong2" ],
						name : "Man Hoang"
					};
					$.ajax({
						headers : {
							'Accept' : 'application/json',
							'Content-Type' : 'application/json'
						},
						type : "POST",
						url : "/DienTuUngDung/json/get",
						dataType : "json",
						data : JSON.stringify(searchCriteria),
						success : function(msg) {
							if (msg) {
								alert("Somebody " + msg.items.length
										+ " was added in list !");
								location.reload(true);
							} else {
								alert("Cannot add to list !");
							}
						},
						error : function(e) {
							console.log("ERROR: ", e);
							alert(e);
						},
						done : function(e) {
							console.log("DONE");
						}

					});
				});
	</script>

</body>
</html>