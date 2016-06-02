package com.spring.mvc.man.hoang.domain;

import java.util.HashMap;
import java.util.Map;

import org.hibernate.criterion.Order;

import com.spring.mvc.man.hoang.utils.DefaultValue;


public class SearchCriteria{
	protected Long offset;
	protected Long itemsPerPage;
	
	protected Order order;
	protected String fieldSort;
	
	protected Map<String, String> keywords;
	protected Map<String, Object>  filters;
	protected String keyword;
	
	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
		addKeyword("ten", keyword);
	}

	public String getFieldSort() {
		return fieldSort;
	}

	public void setFieldSort(String fieldSort) {
		this.fieldSort = fieldSort;
		order = Order.asc(fieldSort);
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public void sortDesc() {
		order = (fieldSort != null) ? Order.desc(fieldSort) : null;
	}
	
	public void sortAsc() {
		order = (fieldSort != null) ? Order.asc(fieldSort) : null;
	}

	
	public SearchCriteria() {
		offset = DefaultValue.OFSSET;
		itemsPerPage = DefaultValue.LIMIT;
		filters = new HashMap<>();
		keywords = new HashMap<>();
	}
	
	public void addFilter(String field, Object value){
		if(filters == null){
			filters = new HashMap<>();
		}
		filters.put(field, value);
	}
	
	public void addKeyword(String field, String value){
		if(keywords == null){
			keywords = new HashMap<>();
		}
		keywords.put(field, value);
	}

	public Map<String, String> getKeywords() {
		return keywords;
	}

	public void setKeywords(Map<String, String> keywords) {
		this.keywords = keywords;
	}

	public Map<String, Object> getFilters() {
		return filters;
	}

	public void setFilters(Map<String, Object> filters) {
		this.filters = filters;
	}

	public Long getOffset() {
		return offset;
	}

	public void setOffset(Long offset) {
		this.offset = offset;
	}

	public Long getItemsPerPage() {
		return itemsPerPage;
	}

	public void setItemsPerPage(Long itemsPerPage) {
		this.itemsPerPage = itemsPerPage;
	}
	
}
