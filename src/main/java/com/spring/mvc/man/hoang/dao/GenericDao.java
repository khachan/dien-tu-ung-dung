package com.spring.mvc.man.hoang.dao;

import java.io.Serializable;
import java.util.List;

import com.spring.mvc.man.hoang.domain.SearchCriteria;
import com.spring.mvc.man.hoang.domain.SearchResult;
import com.spring.mvc.man.hoang.entities.MyEntity;

/**
 * @author Man hoang
 * 
 * @param <E>
 */
public interface GenericDao<E extends MyEntity> {
	/**
	 * Insert new record to database
	 * 
	 * @param t
	 */
	E create(E entity);

	/**
	 * Select records follow its id
	 * 
	 * @param id
	 * @return E
	 */
	E get(Serializable id);

	/**
	 * Update value of a record
	 * 
	 * @param t
	 */
	E update(E entity);
	
	E saveOrUpdate(E entity);

	E delete(E entity);
	
	E delete(Serializable id);

	/**
	 * @param searchCriteria
	 * @return result
	 */
	SearchResult search(SearchCriteria searchCriteria);

	List<E> getAll();
}
