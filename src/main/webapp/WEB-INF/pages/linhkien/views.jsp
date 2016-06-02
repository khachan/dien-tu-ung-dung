<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="../template/libs.jsp"%>
<c:url var="currentUrl" value="/${entity}"/>
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
				<td class="center "><a class="btn btn-success" href="#"> <i
						class="glyphicon glyphicon-zoom-in icon-white"></i> View
				</a> <a class="btn btn-info" href="#"> <i
						class="glyphicon glyphicon-edit icon-white"></i> Edit
				</a> <form:form action='${currentUrl}/${entity.maSo}' method="delete">
						<input type="hidden" name="id" value="${entity.maSo}">
						<button class="btn btn-danger" type="submit">
							<i class="glyphicon glyphicon-trash icon-white"></i> Delete
						</button>
					</form:form></td>
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
			<ul class="pagination">
				<li class="prev disabled"><a href="#">Previous</a></li>
				<li class="active"><a href="#">1</a></li>
				<li><a href="#">2</a></li>
				<li><a href="#">3</a></li>
				<li><a href="#">4</a></li>
				<li class="next"><a href="#">Next</a></li>
			</ul>
		</div>
	</div>
</div>
</div>