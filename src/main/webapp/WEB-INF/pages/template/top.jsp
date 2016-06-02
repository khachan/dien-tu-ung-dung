<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="libs.jsp"%>
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