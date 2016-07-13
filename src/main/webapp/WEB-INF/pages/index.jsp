<%@include file="template/libs.jsp" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<c:url var="currentUrl" value="/"/>
<h1>
	<p>
		<a href="<c:out value="${currentUrl}danhmuc"/>">Danh Mục</a>
	<p>
		<a href="<c:out value="${currentUrl}linhkien"/>">Linh Kiện</a>
	</p>
	<p>
		<a href="<c:out value="${currentUrl}dungcu"/>">Dụng Cụ</a>
	</p>
	<p>
		<a href="<c:out value="${currentUrl}sanpham"/>">Sản Phẩm</a>
	</p>
	<p>
		<a href="<c:out value="${currentUrl}/json/cook"/>">COOK</a>
	</p>
	<p>
		<a href="<c:out value="${currentUrl}/json/json"/>">JSON</a>
	</p>
</h1>
<h1></h1>
