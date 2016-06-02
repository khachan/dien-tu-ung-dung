package com.spring.mvc.man.hoang.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.spring.mvc.man.hoang.entities.SanPham;

@Controller
@RequestMapping("/sanpham")
public class SanPhamController extends GenericController<SanPham>{
}
