package com.spring.mvc.man.hoang.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.spring.mvc.man.hoang.entities.LinhKien;

@Controller
@RequestMapping("/linhkien")
public class LinhKienController extends GenericController<LinhKien>{
}
