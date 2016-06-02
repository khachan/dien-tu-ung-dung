package com.spring.mvc.man.hoang.entities;

import java.io.Serializable;

public abstract class MyEntity implements Serializable {
	protected static final long serialVersionUID = 1L;
	public abstract Class<?> getEntityClass();
	public abstract Serializable getId();
}
