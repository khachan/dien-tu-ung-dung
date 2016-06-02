package com.spring.mvc.man.hoang.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.spring.mvc.man.hoang.entities.DanhMuc;

@Controller
@RequestMapping("/danhmuc")
public class DanhMucController extends GenericController<DanhMuc>{
}
