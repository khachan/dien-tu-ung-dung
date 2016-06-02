package com.spring.mvc.man.hoang.exception;

import org.hibernate.exception.SQLGrammarException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

@ControllerAdvice
public class ExceptionController {
	@ExceptionHandler(value = UnknownResourceException.class)
	public ModelAndView handlePageNotFoundException(){
		ModelAndView mav = new ModelAndView();
		mav.addObject("msg", UnknownResourceException.MESSAGE);
		mav.addObject("code", UnknownResourceException.TITLE);
		mav.setViewName("404");
		return mav;
	}
	
	@ExceptionHandler(value=IncompletedActionException.class)
	public ModelAndView handleSQLException(){
		ModelAndView mav = new ModelAndView("404");
		mav.addObject("msg", IncompletedActionException.MESSAGE);
		mav.addObject("code", IncompletedActionException.TITLE);
		return mav;
	}
	
	@ExceptionHandler(value = SQLGrammarException.class)
	public ModelAndView handleBadReuqestException(){
		ModelAndView mav = new ModelAndView();
		mav.addObject("msg", UnknownResourceException.MESSAGE);
		mav.addObject("code", UnknownResourceException.TITLE);
		mav.setViewName("404");
		return mav;
	}
	
}
