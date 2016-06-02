package com.spring.mvc.man.hoang.services.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.spring.mvc.man.hoang.dao.GenericDao;
import com.spring.mvc.man.hoang.domain.SearchCriteria;
import com.spring.mvc.man.hoang.domain.SearchResult;
import com.spring.mvc.man.hoang.entities.MyEntity;
import com.spring.mvc.man.hoang.services.GenericService;

@Service
public abstract class GenericServiceImpl<E extends MyEntity> implements GenericService<E> {
	@Autowired
	private GenericDao<E> genericDao;

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public E saveOrUpdate(E entity) {
		return genericDao.saveOrUpdate(entity);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public List<E> getAll() {
		return genericDao.getAll();
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public E get(Long id) {
		return genericDao.get(id);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public E create(E entity) {
		return genericDao.create(entity);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public E update(E entity) {
		return genericDao.update(entity);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public E delete(Long id) {
		return genericDao.delete(id);
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public SearchResult search(SearchCriteria searchCriteria){
		return genericDao.search(searchCriteria);
	}
	
}