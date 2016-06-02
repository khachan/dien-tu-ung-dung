package com.spring.mvc.man.hoang.domain;

import java.util.List;

public class SearchResult{
	//list of items to return for a page
	private List<?> items;
	// total number of found items
	private Long offset;
	private Long itemsPerPage;
	private Long totalItems;
	
	public SearchResult() {}
	public SearchResult(List<?> items, Long totalItems) {
		this.items = items;
		this.totalItems = totalItems;
	}
	public List<?> getItems() {
		return items;
	}
	public void setItems(List<?> items) {
		this.items = items;
	}
	public Long getTotalItems() {
		return totalItems;
	}
	public void setTotalItems(Long totalItems) {
		this.totalItems = totalItems;
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
