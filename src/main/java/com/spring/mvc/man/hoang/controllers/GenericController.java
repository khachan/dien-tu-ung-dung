package com.spring.mvc.man.hoang.controllers;

import java.lang.reflect.ParameterizedType;

import javax.annotation.PostConstruct;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.spring.mvc.man.hoang.domain.SearchCriteria;
import com.spring.mvc.man.hoang.domain.SearchResult;
import com.spring.mvc.man.hoang.entities.MyEntity;
import com.spring.mvc.man.hoang.services.GenericService;
import com.spring.mvc.man.hoang.utils.DefaultValue;

public abstract class GenericController<E extends MyEntity> {
    protected Logger logger = Logger.getLogger(GenericController.class);

    @Autowired
    private GenericService<E> genericService;

    private String entityName;

    public GenericController() {
        getEntityName();
    }

    private ModelMap setEntityName(ModelMap model) {
        model.addAttribute("entityName", entityName);
        return model;
    }

    protected String getEntityName() {
        String className = getDomainClass().getName();
        entityName = className.substring(className.lastIndexOf('.') + 1).toLowerCase();
        return entityName;
    }

    @SuppressWarnings("unchecked")
    protected Class<E> getDomainClass() {
        ParameterizedType thisType = (ParameterizedType) getClass().getGenericSuperclass();
        // Get class of T type
        return (Class<E>) thisType.getActualTypeArguments()[0];
    }

    @RequestMapping(value = { "" })
    public String views(ModelMap model, @ModelAttribute SearchCriteria searchCriteria) {
        SearchResult searchResult = genericService.search(searchCriteria);
        setEntityName(model);
        model.addAttribute("searchResult", searchResult);
        return DefaultValue.VIEWS_PAGE;
    }

    @RequestMapping(value = { "/" }, method = RequestMethod.GET)
    public String add(ModelMap model) throws InstantiationException, IllegalAccessException {
        model.addAttribute(entityName, getDomainClass().newInstance());
        model.addAttribute("entityName", getEntityName());
        return DefaultValue.ADD_PAGE;
    }
    
    @RequestMapping(value = { "/{id}" }, method = RequestMethod.GET)
    public String view(ModelMap model, @PathVariable("id") Long id) {
        MyEntity entity = null;
        String page = null;
        if (id < 0) {
            id = -id;
            page = DefaultValue.EDIT_PAGE;
            logger.debug("Edit");
        } else {
            
            page = DefaultValue.VIEW_PAGE;
            logger.debug("Detail");
        }

        entity = genericService.get(id);
        
        model.addAttribute(entityName, entity);
        
        model.addAttribute("entityName", getEntityName());
        return page;
    }

//    @RequestMapping(value = { "/" }, method = RequestMethod.POST)
//    public String save(ModelMap model, E entity) {
//        logger.debug(entity.toString());
//        model = setEntityName(model);
//        return DefaultValue.REDIRECT_HOME + getEntityName();
//    }

    @RequestMapping(method = RequestMethod.PUT)
    public String update(ModelMap model, E entity) {
        genericService.saveOrUpdate(entity);
        return DefaultValue.REDIRECT_HOME + entityName;
    }

    //
    // @RequestMapping
    // public String viewDetail(ModelMap model) {
    // logger.debug("Get all");
    // List<E> list = services.getAll();
    // model.addAttribute("list", list);
    // return getHomePage().toLowerCase() + VIEW_LIST;
    // }
    //
    // public String saveUpdate(ModelMap model) {
    // logger.debug("Get all");
    // List<E> list = services.getAll();
    // model.addAttribute("list", list);
    // return getHomePage().toLowerCase() + VIEW_LIST;
    // }
    //
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public String delete(ModelMap model, @PathVariable("id") Long id) {
        // genericService.get(id);
        model = setEntityName(model);
        System.out.println(genericService.delete(id));
        return DefaultValue.REDIRECT_HOME;
    }
}
