package com.spring.mvc.man.hoang.services;

import java.util.List;

import com.spring.mvc.man.hoang.domain.SearchCriteria;
import com.spring.mvc.man.hoang.domain.SearchResult;

public interface GenericService<E> {
	
	List<E> getAll();
	
	SearchResult search(SearchCriteria searchCriteria);

	E get(Long id);

	E create(E entity);

	E update(E entity);
	
	E saveOrUpdate(E entity);

	E delete(Long id);
}
