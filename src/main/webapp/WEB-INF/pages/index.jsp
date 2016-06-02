<%@include file="template/libs.jsp" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<c:url var="currentUrl" value="/"/>
<h1>
	<p>
		<a href="${currentUrl}danhmuc">Danh Mục</a>
	<p>
		<a href="${currentUrl}linhkien">Linh Kiện</a>
	</p>
	<p>
		<a href="${currentUrl}dungcu">Dụng Cụ</a>
	</p>
	<p>
		<a href="${currentUrl}sanpham">Sản Phẩm</a>
	</p>
</h1>
<h1></h1>
