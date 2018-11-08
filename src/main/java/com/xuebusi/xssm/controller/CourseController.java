package com.xuebusi.xssm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping
public class CourseController {

    @RequestMapping
    public String index() {
        System.out.println("首页");
        return "index";
    }

    @RequestMapping(value = "/list")
    public String list() {
        System.out.println("列表页");
        return "list";
    }

    @RequestMapping(value = "/play")
    public String play() {
        System.out.println("播放页");
        return "play";
    }
}
