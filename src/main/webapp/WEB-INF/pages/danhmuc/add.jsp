<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="../template/libs.jsp"%>
<c:url var="currentUrl" value="/${entityName}" />
<form:form action='${currentUrl}' method="put"
	commandName="${entityName}">
	<fieldset class="form-group">
		<label for="formGroupExampleInput">Tên danh mục</label>
		<form:input path="ten" cssClass="form-control"
			placeholder="Nhập tên danh mục" />
	</fieldset>
	<fieldset class="form-group">
		<label for="formGroupExampleInput">Chức năng</label>
		<form:textarea path="chucNang" cssClass="form-control"
			placeholder="Nhập chức năng" />
	</fieldset>
	<fieldset class="form-group">
		<label for="formGroupExampleInput">Mô tả</label>
		<form:textarea path="moTa" cssClass="form-control"
			placeholder="Nhập chức năng" />
	</fieldset>
	<fieldset class="form-group">
		<label for="formGroupExampleInput">Số lượng linh kiện</label>
		<form:input path="soLinhKien" cssClass="form-control"
			placeholder="Nhập chức năng" />
	</fieldset>
	<button type="submit" class="btn btn-info">Cập nhật</button>
</form:form>
