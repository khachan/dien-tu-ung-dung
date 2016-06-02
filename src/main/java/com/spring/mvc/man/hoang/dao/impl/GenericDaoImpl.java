package com.spring.mvc.man.hoang.dao.impl;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;
import java.util.Map.Entry;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.mvc.man.hoang.dao.GenericDao;
import com.spring.mvc.man.hoang.domain.SearchCriteria;
import com.spring.mvc.man.hoang.domain.SearchResult;
import com.spring.mvc.man.hoang.entities.MyEntity;

@Repository
public abstract class GenericDaoImpl<E extends MyEntity> implements GenericDao<E> {

	@Autowired
	private SessionFactory sessionFactory;

	protected Class<? extends E> daoType;

	protected Session getSession() {
		return sessionFactory.getCurrentSession();
	}

	/**
	 * @return
	 */
	@SuppressWarnings({ "unchecked" })
	private Class<?> getDomainClass() {
		// Check class of E type if is null
		if (daoType == null) {
			// Get parent class of E type
			ParameterizedType thisType = (ParameterizedType) getClass().getGenericSuperclass();
			// Get class of T type
			this.daoType = (Class<E>) thisType.getActualTypeArguments()[0];
		}
		// Return class of T type
		return daoType;
	}

	/**
	 * @return
	 */
	@SuppressWarnings("unused")
	private String getDomainClassName() {
		// Return class name of E type
		return getDomainClass().getName();
	}

	protected Session currentSession() {
		return sessionFactory.getCurrentSession();
	}

	@Override
	public E create(E entity) {
		currentSession().save(entity);
		return entity;
	}

	@Override
	public E saveOrUpdate(E entity) {
		currentSession().saveOrUpdate(entity);
		return entity;
	}

	@Override
	public E update(E entity) {
		currentSession().saveOrUpdate(entity);
		return entity;
	}

	@Override
	public E delete(E entity) {
		currentSession().delete(entity);
		return entity;
	}
	
	@Override
	public E delete(Serializable id) {
		E entity = get(id);
		return delete(entity);
	}

	@SuppressWarnings("unchecked")
	@Override
	public E get(Serializable id) {
		return (E) currentSession().get(getDomainClass(), id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<E> getAll() {
		return currentSession().createCriteria(getDomainClass()).list();
	}

	public SearchResult search(SearchCriteria searchCriteria) {
		Criteria criteria = getSession().createCriteria(getDomainClass());
		// CriteriaBuilder criteriaBuilder
		// Or condition
		Disjunction disjunction = Restrictions.disjunction();
		// And condition
		Conjunction andStatement = Restrictions.conjunction();
		SearchResult result = new SearchResult();

		// Search by many keywords
		for (Entry<String, String> keyword : searchCriteria.getKeywords().entrySet()) {
			disjunction.add(getRestriction(keyword));
		}

		// Search by many filters
		for (Entry<String, Object> filter : searchCriteria.getFilters().entrySet()) {
			andStatement.add(Restrictions.eq(filter.getKey(), filter.getValue()));
		}

		// Set order by if have
		if (searchCriteria.getOrder() != null) {
			criteria.addOrder(searchCriteria.getOrder());
		}

		// Set keywords to query
		criteria.add(disjunction);
		// Set filters to query
		criteria.add(andStatement);

		// Set first record index
		Long offset = searchCriteria.getOffset();
		criteria.setFirstResult(offset.intValue());

		// Set number record to get;
		Long limit = searchCriteria.getItemsPerPage();
		criteria.setMaxResults(limit.intValue());
		result.setItems(criteria.list());

		// Get total records found
		criteria = getSession().createCriteria(getDomainClass());
		// Set keywords to query
		criteria.add(disjunction);
		// Set filters to query
		criteria.add(andStatement);

		// Set count(*) query to find total records
		criteria.setProjection(Projections.rowCount());

		result.setTotalItems((Long) criteria.uniqueResult());
		result.setOffset(offset);
		result.setItemsPerPage(limit);
		return result;
	}

	private LogicalExpression getRestriction(Entry<String, String> keyword) {
		String field = keyword.getKey();
		String value = keyword.getValue();
		// Set condition to get result
		return Restrictions.or(Restrictions.ilike(field, value + "%"), Restrictions.ilike(field, "% " + value + "%"));
	}

}
