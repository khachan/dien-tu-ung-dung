package com.spring.mvc.man.hoang.utils;

import java.io.UnsupportedEncodingException;

public class Lab {

	public static void main(String[] args) {
		String utf = "Mẫn";
		byte[] data = null;
		try {
			data = utf.getBytes("ASCII");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String ascii = new String(data);
		System.out.println(ascii);

	}

}
