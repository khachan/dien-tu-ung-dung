<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="libs.jsp"%>	
<c:url var="currentUrl" value="/"/>
<div class="col-sm-2 sidenav">
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
</div>