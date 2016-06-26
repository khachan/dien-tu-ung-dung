package com.spring.mvc.man.hoang.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.mvc.man.hoang.domain.SearchCriteria;
import com.spring.mvc.man.hoang.domain.SearchResult;
import com.spring.mvc.man.hoang.entities.DanhMuc;
import com.spring.mvc.man.hoang.entities.Shop;
import com.spring.mvc.man.hoang.services.GenericService;
import com.spring.mvc.man.hoang.utils.DefaultValue;

@Controller
@RequestMapping("/json")
public class JSONController {

	@Autowired
	private GenericService<DanhMuc> genericService;

	 @RequestMapping(value = {"", "/"})
	    public String views() {
		 	return "json";
	    }
	
	@RequestMapping(value = "/get", produces="application/json", headers="Accept=application/json")
	public @ResponseBody SearchResult getShopInJSON(@RequestBody SearchCriteria searchCriteria) {
		SearchResult searchResult = genericService.search(searchCriteria);
		System.out.println(searchCriteria.getKeyword());
		return searchResult;

	}
	
	

}