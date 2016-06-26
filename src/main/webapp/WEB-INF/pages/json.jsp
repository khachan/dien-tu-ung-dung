<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="template/libs.jsp"%>
<c:url var="currentUrl" value="/${entity}"/>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>

	<h1>Json page</h1>
	<button class="get">Get JSON</button>
	<script type="text/javascript">
		function show(items) {
			var row = $(".t-row")[0];
			for(i = 0; i < items.length; i++){
				row = row.cloneNode(true);
				row.children[0].innerHTML = items[0].ten;
				$(".t-rows")[0].appendChild(row);
			}
		}
		var searchResult;
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
						success : function(respone) {
							if (respone) {
								console.log("SUCCESS", "Somebody " +  respone
										+ " was added in list !");
								show(respone.items);
								
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
	<table
	class="table table-striped table-bordered bootstrap-datatable datatable responsive dataTable"
	id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info">
	<thead>
		<tr role="row">
			<th class="sorting_asc" role="columnheader" tabindex="0"
				aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
				aria-sort="ascending"
				aria-label="Username: activate to sort column descending"
				style="width: 10%">Danh mục</th>
			<th class="sorting" role="columnheader" tabindex="0"
				aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
				aria-label="Date registered: activate to sort column ascending"
				style="width: 20%;">Chức năng</th>
			<th class="sorting" role="columnheader" tabindex="0"
				aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
				aria-label="Role: activate to sort column ascending"
				style="width: 50%;">Mô tả</th>
			<th class="sorting" role="columnheader" tabindex="0"
				aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
				aria-label="Status: activate to sort column ascending"
				style="width: 5%;">Số linh kiện</th>
			<th class="sorting" role="columnheader" tabindex="0"
				aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
				aria-label="Actions: activate to sort column ascending"
				style="width: 15%;">Actions</th>
		</tr>
	</thead>

	<tbody class = "t-rows" role="alert" aria-live="polite" aria-relevant="all">
			<tr class="t-row">
				<td class="ten">Tên</td>
				<td class="chuc_nang">Mã số</td>
				<td class="mo_ta">Mã số</td>
				<td class="so_luong">Mã số</td>
				<td class="center "><a class="btn btn-success" href="#"> <i
						class="glyphicon glyphicon-zoom-in icon-white"></i> View
				</a> <a class="btn btn-info" href="#"> <i
						class="glyphicon glyphicon-edit icon-white"></i> Edit
				</a> <input type="hidden" name="id" value="Mã số">
						<button class="btn btn-danger" type="submit">
							<i class="glyphicon glyphicon-trash icon-white"></i> Delete
						</button>
				</td>
			</tr>
	</tbody>
</table>