package com.spring.mvc.man.hoang.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.NOT_FOUND, reason="Not Found")
public class UnknownResourceException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public static final String MESSAGE = "The page you requested is not available.";
	public static final String TITLE = "Http Status 404 - Page not found";
	public UnknownResourceException(){
		
	}
}
