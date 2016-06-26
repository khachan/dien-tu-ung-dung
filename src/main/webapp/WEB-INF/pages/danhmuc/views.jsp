<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="../template/libs.jsp"%>
<c:url var="currentUrl" value="/${entityName}" />
<div class="row">
	<div class="col-md-6">
		<div id="DataTables_Table_0_length" class="dataTables_length">
			<label><select class="btn btn-default" size="1"
				name="DataTables_Table_0_length" aria-controls="DataTables_Table_0"><option
						value="10" selected="selected">10</option>
					<option value="25">25</option>
					<option value="50">50</option>
					<option value="100">100</option></select> records per page</label>
		</div>
	</div>
	<div class="col-md-6">
		<form action="${currentUrl}" method="patch">
		<div class="dataTables_filter" id="DataTables_Table_0_filter">
			<input type="hidden" name="_method" value="delete">
			<label>Search: <input type="text" name="keyword"
				aria-controls="DataTables_Table_0">
				<button type="submit" class="btn btn-default">
					<span class="glyphicon glyphicon-search"></span> Search
				</button></label>
			<input type="hidden" id="id-offset" name="offset" htmlEscape="true"
				value="${searchCriteria.offset}" >
			<input type="hidden" id="id-itemsPerPage" name="itemsPerPage"
				htmlEscape="true" value="${searchCriteria.itemsPerPage}" >
		</div>
		</form>
	</div>
</div>
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

	<tbody role="alert" aria-live="polite" aria-relevant="all">
		<c:forEach var="entity" items="${searchResult.items}" varStatus="i">
			<tr class="${i.index%2 == 0 ? 'odd' : 'even'}">
				<td class=" sorting_1">${entity.ten}</td>
				<td class="center ">${entity.maSo}</td>
				<td class="center ">${entity.maSo}</td>
				<td class="center ">${entity.maSo}</td>
				<td class="center "><a class="btn btn-success btn-xs" href="${currentUrl}/${entity.maSo}"> <i
						class="glyphicon glyphicon-zoom-in icon-white"></i> View
				</a> <a class="btn btn-info btn-xs" href="${currentUrl}/${-entity.maSo}"> <i
						class="glyphicon glyphicon-edit icon-white"></i> Edit
				</a> 
					<form:form action='${currentUrl}/${entity.maSo}' method="delete">
						<button class="btn btn-danger btn-xs" type="submit">
							<i class="glyphicon glyphicon-trash icon-white"></i> Delete
						</button>
					</form:form>
				</td>
			</tr>
		</c:forEach>
	</tbody>
</table>
<div class="row">
	<div class="col-md-12">
		<div class="dataTables_info" id="DataTables_Table_0_info">Showing
			1 to 10 of 32 entries</div>
	</div>
	<div class="col-md-12 center-block">
		<div class="dataTables_paginate paging_bootstrap pagination">
			<p class="paging"></p>
		</div>
	</div>
</div>
<script>
$('.paging').bootpag({
	total: ${searchResult.totalItems},
	   page: ${searchResult.offset/searchResult.itemsPerPage + 1},
	   maxVisible: ${searchResult.totalItems/searchResult.itemsPerPage + 1}
	}).on('page', function(event, num){
	    $(".content2").html("Page " + num); // or some ajax content loading...
	});
</script>