package com.spring.mvc.man.hoang.exception;

public class IncompletedActionException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
//	public static final String MESSAGE = "Your action is incomplete, please try again.";
//	public static final String TITLE = "Action incomplete";
	
	public static final String MESSAGE = "The page you requested is not available.";
	public static final String TITLE = "Http Status 404 - Page not found";
	
	public IncompletedActionException(){
		
	}
}
